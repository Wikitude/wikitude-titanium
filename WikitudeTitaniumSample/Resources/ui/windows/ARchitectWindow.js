function ARchitectWindow(WikitudeLicenseKey, augmentedRealityMode, url) {


    /* requirements */
    var jsuri = require('jsuri-1.1.1');
    var util = require('util');
    var wikitude = require('com.wikitude.ti');


    /* Member Variables */
    var _this = this;

    this.augmentedRealityMode = augmentedRealityMode;
    this.URL = url;
    this.mainView = null;


    this.window = Ti.UI.createWindow({
        backgroundColor: 'transparent',
        navBarHidden: true,
        title: 'ARchitectWindow'
    });

    this.window.isDeviceSupported = function() {

        var isDeviceSupported = wikitude.isDeviceSupported(_this.augmentedRealityMode);

        if (isDeviceSupported) {

            _this.window.arview = wikitude.createWikitudeView({
                "licenseKey": WikitudeLicenseKey,
                "augmentedRealityMode": _this.augmentedRealityMode,
                bottom: 0,
                left: 0,
                right: 0,
                top: 65
            });
        }

        return isDeviceSupported;
    };

    this.window.LOCATION_LISTENER_ADDED = false;
    this.window.util = util;
    this.window.locationListener = this.locationListener;


    this.configureWindow(this.window);


    /* lifecycle handling */
    this.window.addEventListener('open', this.onWindowOpen);
    this.window.addEventListener('close', this.onWindowClose);

    /* Android specific lifecycle handling */
    if (util.isAndroid()) {

        this.window.addEventListener('android:back', function() {
            this.close();
        });
    }



    /* ARchitect */
    this.window.loadArchitectWorldFromURL = this.loadArchitectWorldFromURL;

    /* ARchitect World callback handling */
    /* handles document.location = "architectsdk://yourvalues" calls within architect html */
    this.window.onURLWasInvoked = this.onURLWasInvoked;
    this.window.onArchitectWorldLoaded = this.onArchitectWorldLoaded;

    return this.window;
}

ARchitectWindow.prototype.configureWindow = function(window) {

    /* initial view setup */
    var mainView = Ti.UI.createView({
        backgroundColor: '#ffffff',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0
    });


    var headView = Ti.UI.createView({
        backgroundColor: '#f2f2f2',
        left: 0,
        right: 0,
        top: 0,
        height: 65
    });

    var backButton = Ti.UI.createButton({
        title: 'Back',
        left: 6,
        top: 10,
        height: 45,
        width: 75
    });
    backButton.addEventListener('click', function() {
        window.close();
    });

    headView.add(backButton);

    var captureButton = Ti.UI.createButton({
        title: 'Capture',
        right: 6,
        top: 10,
        height: 45,
        width: 75
    });

    captureButton.addEventListener('click', function() {

        var includeWebView = true;
        window.arview.captureScreen(includeWebView, null, { // "Path/In/Bundle/toImage.png"
            onSuccess: function(path) {
                alert('success: ' + path);
            },
            onError: function(errorDescription) {
                alert('error: ' + errorDescription);
            }
        });
    });
    headView.add(captureButton);

    mainView.add(headView);


    window.add(mainView);
};

ARchitectWindow.prototype.locationListener = function(arview) {
	return function(location) {
	    var locationInformation = {
	        latitude: location.coords.latitude,
	        longitude: location.coords.longitude,
	        accuracy: location.coords.accuracy,
	        timestamp: location.coords.timestamp,
	        altitudeAccuracy: location.coords.altitudeAccuracy
	    };

	    // has altitude?
	    if (location.coords.altitude != 0) {
	        locationInformation.altitude = location.coords.altitude;
	    }

	    if ((arview !== null)) {
		    arview.injectLocation(locationInformation);
	    }
   };
};

ARchitectWindow.prototype.onArchitectWorldLoaded = function(event) {
    if (true === event.result) {
        /* iOS only: react on load success */
    } else {
        alert('error loading Architect World: ' + event.error);
    }
};


ARchitectWindow.prototype.loadArchitectWorldFromURL = function(url) {

    this.arview.addEventListener('URL_IS_LOADED', this.onArchitectWorldLoaded);
    this.arview.loadArchitectWorldFromURL(url);
};


ARchitectWindow.prototype.onURLWasInvoked = function(url) {
    var uri = new jsuri.Uri(event.url);
    alert("url was invoked");
};


ARchitectWindow.prototype.onWindowOpen = function() {

    this.getChildren()[0].add(this.arview); // get the main view for this window and add the ar view

    this.arview.addEventListener('URL_WAS_INVOKED', this.onURLWasInvoked); // add an event listener for architectsdk:// url schemes (inside the ARchitect World)

    if (this.util.isAndroid()) {

        Titanium.Geolocation.distanceFilter = 1;
		var _this = this;
		var listener = this.locationListener(_this.arview);
        this.activity.addEventListener('resume', function() {
            if (!_this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.addEventListener('location', listener);
                _this.LOCATION_LISTENER_ADDED = true;
            }
        });

        this.activity.addEventListener('pause', function() {
            if (_this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.removeEventListener('location', listener);
                _this.LOCATION_LISTENER_ADDED = false;
            }
        });

        this.activity.addEventListener('destroy', function(e) {
            if (_this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.removeEventListener('location', listener);
                _this.LOCATION_LISTENER_ADDED = false;
            }
        });

        this.activityListenerLoaded = true;
    }
};

ARchitectWindow.prototype.onWindowClose = function() {

    if (this.arview !== null) {

        this.arview.removeEventListener('URL_WAS_INVOKED', this.onURLWasInvoked);

        this.getChildren()[0].remove(this.arview);
        this.arview = null;
    }
};

module.exports = ARchitectWindow;