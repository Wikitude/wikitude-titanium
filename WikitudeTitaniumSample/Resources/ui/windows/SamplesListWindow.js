function SamplesListWindow(WikitudeLicenseKey, windowTitle, samples) {
    var _this = this;

    var self = null;

    var windowTitle = 'Wikitude Module Samples';

    if (Ti.Platform.name === 'android') {
        self = Ti.UI.createWindow({
            navBarHidden: false,
            title: windowTitle,
        });
    } else {
        self = Ti.UI.createWindow({
            navBarHidden: false,
            title: windowTitle,
            backgroundColor: 'white',
            color: 'black'
        });
    }

    this.samples = samples;

    var list = [];

    var defaultFontSize = Ti.Platform.name === 'android' ? 15 : 18;

    for (var i = 0; i < this.samples.length; i++) {

        var row = Ti.UI.createTableViewRow({
            className: 'forumEvent', // used to improve table performance
            rowIndex: i, // custom property, useful for determining the row during events
            height: defaultFontSize * 2,
            verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
        });

        var labelSample = Ti.UI.createLabel({
            font: {
                fontFamily: 'Arial',
                fontSize: defaultFontSize + 3
            },
            text: _this.samples[i].title,
            left: 10,
            top: 6,
            // height: defaultFontSize+10
        });

        row.add(labelSample);
        
        var loadWorld = function(architectWindow, sample) {
            architectWindow.loadArchitectWorldFromURL(sample.path, sample.requiredFeatures, sample.startupConfiguration);
            architectWindow.open();
                				                
            if ( sample.requiredExtension === "ObtainPoiDataFromApplicationModel" )
            {
            	if (Ti.Platform.name === 'android') {
	                architectWindow.arview.addEventListener('WORLD_IS_LOADED', function () {
	                	LocationUpdater.setArchitectWindow(architectWindow);
    	                Ti.Geolocation.getCurrentPosition( LocationUpdater.onLocationUpdated );
                  	});
                } else {
	                LocationUpdater.setArchitectWindow(architectWindow);
    	            Ti.Geolocation.getCurrentPosition( LocationUpdater.onLocationUpdated );
                } 
            }
        };

        row.callback = function(index) 
        {
            var ARchitectWindow = require('/ui/windows/ARchitectWindow');
            
            var sample = _this.samples[index];
            
  		  	Ti.include("/ui/windows/LocationUpdater.js");
		  	
            var architectWindow = new ARchitectWindow(WikitudeLicenseKey);
            if (architectWindow.isDeviceSupported(sample.requiredFeatures)) {
            	if (Ti.Platform.name === 'android') {
		            var geoPermissionRequired = sample.requiredFeatures.indexOf("geo") != -1;
		            var hasCameraPermission = Titanium.Media.hasCameraPermissions();
		            var hasGeoPermission = Ti.Geolocation.hasLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE);
					
					if (geoPermissionRequired) {
						Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_HIGH);
					}
	        		
	            	if ((geoPermissionRequired && !hasGeoPermission ) || !hasCameraPermission) {
	            		Titanium.Media.requestCameraPermissions(function(e) {
					        if (e.success === true) {
					        	if (!geoPermissionRequired || hasGeoPermission) {
					        		loadWorld(architectWindow, sample);
					        	} else {
					        		hasCameraPermission = true;
					        	}
					        } else {
					            alert("Access denied, error: " + e.error);
					        }
					  	});
	            		if (geoPermissionRequired && !hasGeoPermission) {
							Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, function(e) {
						        if (e.success === true) {
						        	if (hasCameraPermission) {
						        		loadWorld(architectWindow, sample);
						        	} else {
						        		hasGeoPermission = true;
						        	}
						        } else {
						            alert("Access denied, error: " + e.error);
						        }
						  	});
						}
					} else {
	            		loadWorld(architectWindow, sample);
					}
            	} else {
            		loadWorld(architectWindow, sample);
            	}
            } 
            else 
            {
                alert('not supported');
            }
            
        	
        };

        list.push(row);
    }

    var listView = Ti.UI.createTableView({
        data: list
    });

    listView.addEventListener('click', function(e) {
        list[e.index].callback(e.index);
    });

    var view = Ti.UI.createView({
        height: '100%',
        layout: 'vertical'
    });

    if (Ti.Platform.name != 'android') {
	    var backButton = Ti.UI.createButton({
	        title: 'Back',
	        font: {
	            fontFamily: 'Arial',
	            fontSize: defaultFontSize
	        },
	        left: 6,
	        top: 6,
	        height: defaultFontSize * 2,
	        width: defaultFontSize * 4
	    });
	    backButton.addEventListener('click', function() {
	        self.close();
	    });

    	view.add(backButton);
	}
	
    view.add(listView);
    self.add(view);

    return self;
}

module.exports = SamplesListWindow;