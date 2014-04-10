function ARchitectWindow(WikitudeLicenseKey, augmentedRealityMode, url) {


    /* requirements */
    var jsuri = require('jsuri-1.1.1');
    var util = require('util');
    var wikitude = require('com.wikitude.ti');


    /* Member Variables */
    var _this = this;

    _this.augmentedRealityMode = augmentedRealityMode;
    _this.URL = url;
    _this.mainView = null;


    _this.window = Ti.UI.createWindow({
        backgroundColor: 'transparent',
        navBarHidden: true,
        title: 'ARchitectWindow'
    });

    _this.window.isDeviceSupported = function() {

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

    _this.window.LOCATION_LISTENER_ADDED = false;
    _this.window.util = util;


    _this.configureWindow(_this.window);


    /* lifecycle handling */
    _this.window.addEventListener('open', _this.onWindowOpen);
    _this.window.addEventListener('close', _this.onWindowClose);

    /* Android specific lifecycle handling */
    if (util.isAndroid()) {

        _this.window.addEventListener('android:back', function() {
            _this.window.close();
        });
    }


    _this.window.locationListener = _this.locationListener;


    /* ARchitect */
    _this.window.loadArchitectWorldFromURL = _this.loadArchitectWorldFromURL;

    /* ARchitect World callback handling */
    /* handles document.location = "architectsdk://yourvalues" calls within architect html */
    _this.window.onURLWasInvoked = _this.onURLWasInvoked;
    _this.window.onArchitectWorldLoaded = _this.onArchitectWorldLoaded;

    return _this.window;
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
            didCaptureScreen: function(path) {
                alert('success: ' + path);
            },
            didFailToCaptureScreen: function(errorDescription) {
                alert('error: ' + errorDescription);
            }
        });
    });
    headView.add(captureButton);

    mainView.add(headView);


    window.add(mainView);
}

ARchitectWindow.prototype.locationListener = function(location) {

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

    if ((this.arview !== null)) {
        this.arview.userLocation = locationInformation;
    }
}


ARchitectWindow.prototype.onArchitectWorldLoaded = function(event) {
    if (true === event.result) {
        /* iOS only: react on load success */
    } else {
        alert('error loading Architect World: ' + event.error);
    }
}


ARchitectWindow.prototype.loadArchitectWorldFromURL = function(url) {

    this.arview.addEventListener('URL_IS_LOADED', this.onArchitectWorldLoaded);
    this.arview.loadArchitectWorldFromURL(url);
}


ARchitectWindow.prototype.onURLWasInvoked = function(url) {
    var uri = new jsuri.Uri(event.url);
    alert("url was invoked");
}


ARchitectWindow.prototype.onWindowOpen = function() {

    this.getChildren()[0].add(this.arview); // get the main view for this window and add the ar view

    this.arview.addEventListener('URL_WAS_INVOKED', this.onURLWasInvoked); // add an event listener for architectsdk:// url schemes (inside the ARchitect World)

    if (this.util.isAndroid()) {

        Titanium.Geolocation.distanceFilter = 1;

        this.activity.addEventListener('resume', function() {
            if (!this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.addEventListener('location', this.locationListener);
                this.LOCATION_LISTENER_ADDED = true;
            }
        });

        this.activity.addEventListener('pause', function() {
            if (this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.removeEventListener('location', this.locationListener);
                this.LOCATION_LISTENER_ADDED = false;
            }
        });

        this.activity.addEventListener('destroy', function(e) {
            if (this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.removeEventListener('location', this.locationListener);
                this.LOCATION_LISTENER_ADDED = false;
            }
        });

        this.activityListenerLoaded = true;
    }
}

ARchitectWindow.prototype.onWindowClose = function() {

    if (this.arview !== null) {

        this.arview.removeEventListener('URL_WAS_INVOKED', this.onURLWasInvoked);

        this.getChildren()[0].remove(this.arview);
        this.arview = null;
    }
}

module.exports = ARchitectWindow;