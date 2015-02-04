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

        row.callback = function(index) {
            var ARchitectWindow = require('/ui/windows/ARchitectWindow');
            
            var arFeatures = _this.samples[i].augemtedRealityFeatures;

            var architectWindow = new ARchitectWindow(WikitudeLicenseKey, arFeatures);
            if (architectWindow.isDeviceSupported(arFeatures)) {
                architectWindow.loadArchitectWorldFromURL(_this.samples[index].file, arFeatures, 
                										  { 
                										  	"cameraPosition": _this.samples[i].cameraPosition,
										                    "cameraFocusMode": "Locked",
										                    //"cameraFocusMode": "AutoFocus",
										                    //"cameraFocusMode": "ContinuousAutoFocus",
										                    "iOS" : {
				                    	                        "CaptureSessionPreset" : "1280x720",
										                        "cameraFocusRangeRestriction" : "CameraFocusRangeNear",
                    											"videoMirrored" : true
										                    },
										                    "android" : {
										                    	
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