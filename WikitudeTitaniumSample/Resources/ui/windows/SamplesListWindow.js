function SamplesListWindow(WikitudeLicenseKey, windowTitle, samples) {

    var _this = this;

    var self = null;

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

    var defaultFontSize = Ti.Platform.name === 'android' ? 24 : 18;

    for (var i = 0; i < this.samples.length; i++) {

        var row = Ti.UI.createTableViewRow({
            className: 'forumEvent', // used to improve table performance
            rowIndex: i, // custom property, useful for determining the row during events
            height: defaultFontSize * 3,
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

        row.callback = function(index) 
        {
            var ARchitectWindow = require('/ui/windows/ARchitectWindow');
            
            /* flag mask bits:
             * Feature_Geo         (1<<2)
			 * Feature_2DTracking  (1<<0)
             */
            var arFeatures = (_this.samples[index].augmentedRealityFeatures != undefined) ? _this.samples[index].augmentedRealityFeatures : 0;
            
            /* possible values: "Front", "Back" */
            var camPos = (_this.samples[index].cameraPosition != undefined) ? _this.samples[index].cameraPosition : ""; 

			/* possible values: "Locked", "AutoFocus", "ContinuousAutoFocus" */
            var cameraFocusMode = (_this.samples[index].cameraFocusMode != undefined) ? _this.samples[index].cameraFocusMode : "";
             
            /* possible values: "320x240", "640x480", "1280x720" (iOS only) */
            var captureSessionPreset = (_this.samples[index].captureSessionPreset != undefined) ? _this.samples[index].captureSessionPreset : "640x480"; 

			/* possible values: "Near", "Far", "None" (iOS only) */
			var cameraFocusRangeRestriction = (_this.samples[index].cameraFocusRangeRestriction != undefined) ? _this.samples[index].cameraFocusRangeRestriction : "";

			/* possible values: true, false (iOS only) */
			var videoMirrored = (_this.samples[index].videoMirrored != undefined) ? _this.samples[index].videoMirrored : false;


            var architectWindow = new ARchitectWindow(WikitudeLicenseKey);
            if (architectWindow.isDeviceSupported(arFeatures)) {
                architectWindow.loadArchitectWorldFromURL(_this.samples[index].file, 
                										  arFeatures, 
                										  {
                										  	"cameraPosition": camPos,
										                    "cameraFocusMode": cameraFocusMode,
										                    "iOS" : {
				                    	                        "captureSessionPreset" : captureSessionPreset,
										                        "cameraFocusRangeRestriction" : cameraFocusRangeRestriction,
                    											"videoMirrored" : videoMirrored
										                    }
                										  });
                architectWindow.open();
            } else {
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

    var backButton = Ti.UI.createButton({
        title: 'Back',
        font: {
            fontFamily: 'Arial',
            fontSize: defaultFontSize
        },
        left: 6,
        top: 6,
        height: defaultFontSize * 3,
        width: defaultFontSize * 6
    });
    backButton.addEventListener('click', function() {
        self.close();
    });

    view.add(backButton);

    view.add(listView);
    self.add(view);

    return self;
}

module.exports = SamplesListWindow;