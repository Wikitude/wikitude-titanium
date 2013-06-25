function ARchitectWindow(WikitudeLicenseKey, url) {

	var _this = this;
	
	this.LOCATION_LISTENER_ADDED = false;
	
	/* Member Variables */
	var worldUrl = url;
	this.arview = null;
	

	/* initial view setup */
	var jsuri = require('jsuri-1.1.1'),
		util = require('util'),
		wikitude = require('com.wikitude.ti');

	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : true,
		title : 'ARchitectWindow'
	});

	var headView = Ti.UI.createView({
		backgroundColor : '#f2f2f2',
		left : 0, right : 0, top : 0,
		height : 48
	});

	self.add(headView);

	var headLabel = Ti.UI.createLabel({
		text : 'AR'
	});

	headView.add(headLabel);

	var backButton = Ti.UI.createButton({
		title : 'Back',
		left : 6, top : 6
		// ,height : 36, width : 64
	});
	backButton.addEventListener('click', function() {
		self.close();
	});

	headView.add(backButton);

	var mainView = Ti.UI.createView({
		backgroundColor : '#ffffff',
		bottom : 0, left : 0, right : 0, top : 48
	});

	self.add(mainView);
	
	var _this = this;
	
	this.locationListener = function(location) {
		var locationInformation = { latitude: location.coords.latitude, longitude: location.coords.longitude, accuracy: location.coords.accuracy, timestamp: location.coords.timestamp, altitudeAccuracy : location.coords.altitudeAccuracy  };
		
		// has altitude?
		if (location.coords.altitude != 0) {
			locationInformation.altitude = location.coords.altitude; 
		}
		
		if ( ( _this.arview!==null ) ) {
			_this.arview.userLocation = locationInformation;	
		}
		
	};


	/* lifecycle handling */
	self.addEventListener('open', function() {

		_this.arview = wikitude.createWikitudeView({
			licenseKey : WikitudeLicenseKey,
			bottom : 0, left : 0, right : 0, top : 0
		});

		mainView.add(_this.arview);
		
		if (Titanium.Platform.name == 'android') {

			// Titanium.Geolocation.distanceFilter = 1;
				
            self.activity.addEventListener('resume', function() {
		      if (!_this.LOCATION_LISTENER_ADDED) {
		            Titanium.Geolocation.addEventListener('location', _this.locationListener);
		            _this.LOCATION_LISTENER_ADDED = true;
		        }
		    });
            
            self.activity.addEventListener('pause', function() {
                if (_this.LOCATION_LISTENER_ADDED) {
	                Titanium.Geolocation.removeEventListener('location', _this.locationListener);
	                _this.LOCATION_LISTENER_ADDED = false;
	            }
            });
            
            self.activity.addEventListener('destroy', function(e) {
		        if (_this.LOCATION_LISTENER_ADDED) {
		            Titanium.Geolocation.removeEventListener('location', _this.locationListener);
		            _this.LOCATION_LISTENER_ADDED = false;
		        }
		    });
            
         	self.activityListenerLoaded = true;	   
         };
         
        _this.arview.addEventListener('URL_WAS_INVOKED', onUrlWasInvoked); // setup event listener

		_this.arview.architectWorldUri = url; // load ARchitect world
         
         
       });

	self.addEventListener('close', function() {

		if (_this.arview !== null) {

			_this.arview.removeEventListener('URL_WAS_INVOKED', onUrlWasInvoked); // useless, since arview is then destroyed

			mainView.remove(_this.arview);
			_this.arview = null;
		}
	});


	/* Android specific lifecycle handling */
	if (util.isAndroid()) {

		self.addEventListener('android:back', function() {
			self.close();
		});
	}


	/* ARchitect World callback handling */
	/* handles document.location = "architectsdk://yourvalues" calls within architect html */
	var onUrlWasInvoked = function(event) {
		var uri = new jsuri.Uri(event.url);
		alert("url was invoked");
	};
	
	return self;
}

module.exports = ARchitectWindow;
