function ARchitectWindow(WikitudeLicenseKey, url) {

    /* requirements */
    var util = require('util');
    var wikitude = require('com.wikitude.ti');


    /* Member Variables */
    var _this = this;

    this.URL = url;
    this.mainView = null;

    if (Ti.Platform.name === 'android') {
        this.window = Ti.UI.createWindow({
	        backgroundColor: 'transparent',
	        navBarHidden: true,
	        title: 'ARchitectWindow'
        });
    } else {
        this.window = Ti.UI.createWindow({
	        backgroundColor: 'transparent',
	        navBarHidden: true,
	        title: 'ARchitectWindow',
            top: 20
        });
    }

    this.window.isDeviceSupported = function(augmentedRealityFeatures) {

        var isDeviceSupported = wikitude.isDeviceSupported(augmentedRealityFeatures);

        if (isDeviceSupported) {

            _this.window.arview = wikitude.createWikitudeView({
                "licenseKey": WikitudeLicenseKey,
                "augmentedRealityFeatures": augmentedRealityFeatures,
                bottom: 0,
                left: 0,
                right: 0,
                top: 35
            });
        }

        return isDeviceSupported;
    };

    this.window.getMissingFeatureMessage = function(augmentedRealityFeatures) {
        return wikitude.getMissingFeatureMessage(augmentedRealityFeatures);
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
    this.window.unauthorizedAPIs= [];    
    this.window.apiAuthorizationResults = [];
    this.window.accessSuccessCallback = null;

    this.window.loadArchitectWorldFromURL = this.loadArchitectWorldFromURL;

    /* ARchitect World callback handling */
    /* handles AR.platform.sendJSONObject calls within architect html */
    this.window.onJSONObjectReceived = this.onJSONObjectReceived;
    this.window.onArchitectWorldLoaded = this.onArchitectWorldLoaded;
    
    this.window.callJavaScript = this.callJavaScript;
    
    /* runtime permission handling */
    this.window.requestLocationPermission = this.requestLocationPermission;
    this.window.requestCameraPermission = this.requestCameraPermission;
    
    this.window.restrictedAPIs = this.restrictedAPIs;
    this.window.requestAccess = this.requestAccess;
    this.window.requestPermissionForRestrictedAPI = this.requestPermissionForRestrictedAPI;
    this.window.permissionRequestFinished = this.permissionRequestFinished;

    return this.window;
}

ARchitectWindow.prototype.callJavaScript = function( jsSource ) 
{
	this.arview.callJavaScript( jsSource );
};

ARchitectWindow.prototype.configureWindow = function(window) {

    var defaultFontSize = Ti.Platform.name === 'android' ? 8 : 16;

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
        height: 35
    });

    var backButton = Ti.UI.createButton({
        title: 'Back',
        font: {
            fontFamily: 'Arial',
            fontSize: defaultFontSize
        },
        left: 6,
        height: 30,
        width: 100
    });
    backButton.addEventListener('click', function() {
        window.close();
    });

    headView.add(backButton);

    var captureButton = Ti.UI.createButton({
        title: 'Capture',
        font: {
            fontFamily: 'Arial',
            fontSize: defaultFontSize
        },
        right: 6,
        height: 30,
        width: 100
    });

    captureButton.addEventListener('click', function() {

        var includeWebView = true;
        window.arview.captureScreen(includeWebView, null, { // "Path/In/Bundle/toImage.png"
            onSuccess: function(path) {
                if(path)
                    alert('success: screen stored to ' + path);
                else
                    alert('success: screen stored to the device\'s image library');
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
        if (location !== void 0 && location.coords !== void 0) {
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
        } else {
            console.log("Location received was undefined, check if your GPS is enabled and you have location permissions granted.");
        }
   };
};

ARchitectWindow.prototype.onArchitectWorldLoaded = function(event) {
    if (true === event.result) {
        /* empty default implementation */
    } else {
        alert('error loading Architect World: ' + event.error);
    }
};

ARchitectWindow.prototype.loadArchitectWorldFromURL = function(url, augmentedRealityFeatures, startupConfiguration) {
    this.arview.addEventListener('WORLD_IS_LOADED', this.onArchitectWorldLoaded);
    this.arview.addEventListener('DEVICE_SENSOR_CALIBRATION_NEEDED', function(){alert('calibration needed');});
    this.arview.addEventListener('DEVICE_SENSOR_CALIBRATION_FINISHED', function(){alert('calibration done');});
    this.arview.loadArchitectWorldFromURL(url, augmentedRealityFeatures, startupConfiguration);
};

ARchitectWindow.prototype.onJSONObjectReceived = function(jsonObject)
{
    if (typeof jsonObject.action !== 'undefined')
    {
        if ( jsonObject.action === "capture_screen" ) {
            var includeWebView = true;
            this.captureScreen(includeWebView, null, { // "Path/In/Bundle/toImage.png"
                onSuccess: function(path) {
                    if(path)
                        alert('success: screen stored to ' + path);
                    else
                        alert('success: screen stored to the device\'s image library');
                },
                onError: function(errorDescription) {
                    alert('error: ' + errorDescription);
                }
            });
        } else if (jsonObject.action === "present_poi_details") {
            var alertMessage = "Poi '" + jsonObject.id + "' selected\nTitle: " + jsonObject.title + "\nDescription: " + jsonObject.description;
            alert(alertMessage);
        }
    }
};

ARchitectWindow.prototype.onWindowOpen = function() {

	var _this = this;

	_this.getChildren()[0].add(_this.arview);

    _this.arview.addEventListener('JSON_OBJECT_RECEIVED', _this.onJSONObjectReceived); // add an event listener for architectsdk:// url schemes (inside the ARchitect World)

    if (_this.util.isAndroid()) {

        Titanium.Geolocation.distanceFilter = 1;
		var listener = _this.locationListener(_this.arview);
		
		var isOnOpen = true; //boolean var to check if location service started for first time onWindowOpen
		
		if(isOnOpen){
		   Titanium.Geolocation.addEventListener('location', listener); //start location listener and passing data
            	   _this.LOCATION_LISTENER_ADDED = true;
		}
		
        _this.activity.addEventListener('resume', function() {
            if (!_this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.addEventListener('location', listener);
                _this.LOCATION_LISTENER_ADDED = true;
                isOnOpen = false; //setting to false to not add again location listener
            }
        });

        _this.activity.addEventListener('pause', function() {
            if (_this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.removeEventListener('location', listener);
                _this.LOCATION_LISTENER_ADDED = false;
                isOnOpen = false; //setting to false to not add again location listener
            }
        });

        _this.activity.addEventListener('destroy', function(e) {
            if (_this.LOCATION_LISTENER_ADDED) {
                Titanium.Geolocation.removeEventListener('location', listener);
                _this.LOCATION_LISTENER_ADDED = false;
                isOnOpen = false; //setting to false to not add again location listener
            }
        });

        _this.activityListenerLoaded = true;
    }
};

ARchitectWindow.prototype.onWindowClose = function() {

    if (this.arview !== null) {

        this.arview.removeEventListener('JSON_OBJECT_RECEIVED', this.onJSONObjectReceived);

        this.getChildren()[0].remove(this.arview);
        this.arview = null;
    }
};

ARchitectWindow.prototype.requestLocationPermission = function(callback) {
	if (Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE)) {
		callback({'success': true, 'code': 0});
	}
	else {
		Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE,
			function (result) {				
				callback(result);
			}
		);
	}
};

ARchitectWindow.prototype.requestCameraPermission = function (callback) {
	if (Ti.Media.hasCameraPermissions()) {
		callback({'success': true, 'code': 0});
	}
	else {
		Ti.Media.requestCameraPermissions(
			function (result) {				
				callback(result);
			}
		);
	}
};

ARchitectWindow.prototype.restrictedAPIs = function(requiredFeatures) {
	
	var restrictedAPIs = [];	
	for ( requiredFeature in requiredFeatures ) {		
		if ( 'image_tracking' == requiredFeatures[requiredFeature] || 'instant_tracking' == requiredFeatures[requiredFeature] || 'object_tracking' == requiredFeatures[requiredFeature] ) {
			restrictedAPIs.push('camera');
		} else if ( 'geo' == requiredFeatures[requiredFeature] ) {
			restrictedAPIs.push('camera');
			restrictedAPIs.push('location');
		}
	}
	
	return restrictedAPIs;
};

ARchitectWindow.prototype.requestAccess = function(restrictedAPIs, callback) {
		
	this.unauthorizedAPIs = restrictedAPIs.slice();
	this.accessSuccessCallback = callback;

	if ( this.unauthorizedAPIs.length ) {
		this.requestPermissionForRestrictedAPI(this.unauthorizedAPIs[0]);
	}
};

ARchitectWindow.prototype.requestPermissionForRestrictedAPI= function(restrictedAPI) {
	
	var _this = this;
	if ( 'camera' == restrictedAPI ) {
		this.requestCameraPermission(function(result) {
			_this.permissionRequestFinished(result);
		});
	} else if ( 'location' == restrictedAPI ) {
		this.requestLocationPermission(function(result) {
			_this.permissionRequestFinished(result);
		});
	} else {
		alert("Unable to request access for unknown feature '" + requiredFeature + "'.");
	}
};

ARchitectWindow.prototype.permissionRequestFinished = function(result) {
	
	/* For some reason the unauthorizedAPIs array is not mutable, so we need to make a temporary copy, edit it and assign it back to unauthorizedAPIs. */
	var t = this.unauthorizedAPIs.slice(); 
	t.shift();
	this.unauthorizedAPIs = t;
		
	var n = this.apiAuthorizationResults.slice();
	n.push(result);
	this.apiAuthorizationResults = n;
	
	if ( this.unauthorizedAPIs.length ) {		
		this.requestPermissionForRestrictedAPI(this.unauthorizedAPIs[0]);			
	} else {		
		var callbackResult = {'errors': []};
		var allPermissionsGranted = true;
		
		this.apiAuthorizationResults.forEach(function(result) {		
			allPermissionsGranted &= result.success;
			if ( !result.success ) {
				callbackResult['errors'].push(result.error);
			}
		});
		
		callbackResult['success'] = allPermissionsGranted;
				
		if ( this.accessSuccessCallback ) {
			this.accessSuccessCallback(callbackResult);
		}
	}
};

module.exports = ARchitectWindow;
