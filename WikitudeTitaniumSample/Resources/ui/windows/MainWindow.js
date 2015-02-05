

var FeatureGeo         = (1<<2);
var Feature2DTracking  = (1<<0);


function MainWindow() {

    var _this = this;

    /*
     * Please have a look at the Wikitude website for licensing questions.
     * You need a valid license key to get rid of Watermarking and intro-animation
     *
     * The license key used in this project is ONLY valid for this project and must not
     * be used for your project.
     * You need to provide a valid trial, flex or pro license key in order to try/use the Wikitude SDK.
     *
     * http://www.wikitude.com/products/wikitude-sdk/pricing/
     */
    var WikitudeLicenseKey = "kDc867UKvVb4YuftUQio+qnZAWWyXBy6sYPisyGa7zWb6Tn3Ot3MpH6k8JXfGArpibd/dTLVpIchtwpXLSrE2tXgqH7dWnnUMryhUXzejWY0Nr3E0p3wq/4BGeOvkP3vEp9o8OQx3uwy8rSeqLbU7s7c0yXYOQXR3ghyLt6yQR1TYWx0ZWRfX2eVB3YBo0fXnhFQ53ghQoYtMhjgz2Cdt6dR2OvjpY/PQU7oNVYZH6RYl6KydgIR5hNzMDsh5k8QixEMi/zJzXtvY5WLnCS97s8zH+BqtD2iRJRk/pbHyHFz7mDKWUgOJeAoYky69lwSqfMMyFdwFKc455OCguJmrAOMk5FO+M6eg3xwEJtcYtp+3qq9nv405y6wroo64aG/wiDXLTBct+bQc3zeFs8hvMbFteHkJ+ubhV7N+i4NrnOAx+Cc4oDxyjdicyVWmxIDfYUDq4KFA/kEa4vhC8dS9iqeEvWh5eHV9kHwsVRfwnG17mmPnQifgxbhK+cQ2Rqpp1mADcaeetKdHJYLXl7mnJHaGsFuEDQpJYlXEzmGtNmM4wtCh8mcl8lLcfnxKgx/OfbzbV8bP74EFcgtTGM7H31Hb83GOryeQnngoqXl/3vAjklErQNWHE+eBJfYf9UCu60LXTrHDBwvGIO/kr3wliwgu4DAgo7I72gTtb8iVX6m8XBReyCYNCtADWGTmrknSGaNDGTbZzp0ZwEKLwnVG0s8g45aCpUYjerBsHe1XjQ=";

    var windowTitle = 'Wikitude Module Samples';

    var self = null;

    if (Ti.Platform.name === 'android') {
        self = Ti.UI.createWindow({
            navBarHidden: false,
            title: windowTitle,
            exitOnClose: true
        });
    } else {
        self = Ti.UI.createWindow({
            navBarHidden: false,
            title: windowTitle,
            backgroundColor: 'white',
            color: 'black',
            exitOnClose: true
        });
    }

    // sample meta-information
    this.samples = [
        // Image Recognition
        {
            windowTitle: 'Image Recognition',
            samples: [{
                title: '1. Image on Target',
                file: '1_ImageRecognition_1_ImageOnTarget/index.html',
                augmentedRealityFeatures: Feature2DTracking,
                cameraPosition: "Back"
            }, {
                title: '2. Multiple Targets',
                file: '1_ImageRecognition_2_MultipleTargets/index.html',
                augmentedRealityFeatures: Feature2DTracking,
                cameraPosition: "Front"
            }, {
                title: '3. Interactivity',
                file: '1_ImageRecognition_3_Interactivity/index.html',
                augmentedRealityFeatures: Feature2DTracking,
                cameraPosition: "Back",
                videoMirrored: true
            }, {
                title: '4. HTML Drawable',
                file: '1_ImageRecognition_4_HtmlDrawable/index.html',
                augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '5. Bonus-Sparkles',
                file: '1_ImageRecognition_5_Bonus-Sparkles/index.html',
                augmentedRealityFeatures: Feature2DTracking
            }]
        },

        // 3D and Image Recognition
        {
            windowTitle: '3D and Image Recognition',
            samples: [{
                title: '1. 3D Model on Target',
                file: '2_3dAndImageRecognition_1_3dModelOnTarget/index.html',
                augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '2. Appearing Animation',
                file: '2_3dAndImageRecognition_2_AppearingAnimation/index.html',
                augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '3. Interactivity',
                file: '2_3dAndImageRecognition_3_Interactivity/index.html',
                augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '4. Snap to Screen',
                file: '2_3dAndImageRecognition_4_SnapToScreen/index.html',
                augmentedRealityFeatures: Feature2DTracking
            }]
        },

        // Point Of Interest
        {
            windowTitle: 'Point Of Interest',
            samples: [{
                    title: '1. POI at location',
                    file: '3_PointOfInterest_1_PoiAtLocation/index.html',
	                augmentedRealityFeatures: FeatureGeo
                }, {
                    title: '2. POI with label',
                    file: '3_PointOfInterest_2_PoiWithLabel/index.html',
	                augmentedRealityFeatures: FeatureGeo
                }, {
                    title: '3. Multiple POIs',
                    file: '3_PointOfInterest_3_MultiplePois/index.html',
	                augmentedRealityFeatures: FeatureGeo
                }, {
                    title: '4. Selecting POIs',
                    file: '3_PointOfInterest_4_SelectingPois/index.html',
	                augmentedRealityFeatures: FeatureGeo
                }

            ]
        },

        // Obtain POI data
        {
            windowTitle: 'Obtain POI data',
            samples: [{
                title: '1. From local resource',
                file: '4_ObtainPoiData_2_FromLocalResource/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }, {
                title: '2. From webservice',
                file: '4_ObtainPoiData_3_FromWebservice/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }]
        },

        // Browsing POIs
        {
            windowTitle: 'Browsing POIs',
            samples: [{
                title: '1. Presenting Details',
                file: '5_BrowsingPois_1_PresentingDetails/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }, {
                title: '2. Adding Radar',
                file: '5_BrowsingPois_2_AddingRadar/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }, {
                title: '3. Limiting Range',
                file: '5_BrowsingPois_3_LimitingRange/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }, {
                title: '4. Reloading Content',
                file: '5_BrowsingPois_4_ReloadingContent/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }]
        },

        // Video Drawables
        {
            windowTitle: 'Videos in Image Recognition',
            samples: [{
                title: '1. Simple Video',
                file: '6_Video_1_SimpleVideo/index.html',
	            augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '2. Playback States',
                file: '6_Video_2_PlaybackStates/index.html',
	            augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '3. Snapping Video',
                file: '6_Video_3_SnappingVideo/index.html',
	            augmentedRealityFeatures: Feature2DTracking
            }, {
                title: '3. Transparent Video',
                file: '6_Video_4_Bonus-TransparentVideo/index.html',
	            augmentedRealityFeatures: Feature2DTracking
            }]
        },

        // Demos
        {
            windowTitle: 'Demos',
            samples: [{
                title: '1. IR and Geo',
                file: '99_Demo_1_ImageRecognitionAndGeo/index.html',
	            augmentedRealityFeatures: FeatureGeo | Feature2DTracking
            }, {
                title: '2. Solar System (Geo)',
                file: '99_Demo_2_SolarSystem(Geo)/index.html',
	            augmentedRealityFeatures: FeatureGeo
            }, {
                title: '3. Solar System (IR)',
                file: '99_Demo_3_SolarSystem(ImageRecognition)/index.html',
	            augmentedRealityFeatures: FeatureGeo | Feature2DTracking
            }]
        }
    ];


    var list = [];

    var defaultFontSize = Ti.Platform.name === 'android' ? 24 : 18;

    var i = 0;

    // add samples to list
    for (i = 0; i < this.samples.length; i++) {

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
            text: _this.samples[i].windowTitle,
            left: 10,
            top: 6,
            // height: defaultFontSize+10
        });

        row.add(labelSample);

        row.callback = function(index) {
            var SamplesListWindow = require('/ui/windows/SamplesListWindow');
            new SamplesListWindow(WikitudeLicenseKey, _this.samples[index].windowTitle, _this.samples[index].samples).open();
        };

        list.push(row);
    }


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
        text: 'Launch World via Url',
        left: 10,
        top: 6,
        // height: defaultFontSize+10
    });

    row.add(labelSample);

    row.callback = function(index) {
        var LaunchViaUrlWindow = require('/ui/windows/LaunchViaUrlWindow');
        new LaunchViaUrlWindow(WikitudeLicenseKey, 'Launch World via Url').open();
    };

    list.push(row);

    // create listview
    var listView = Ti.UI.createTableView({
        data: list
    });

    // add click-listener
    listView.addEventListener('click', function(e) {
        list[e.index].callback(e.index);
    });


    var view = Ti.UI.createView({
        height: '100%',
        layout: 'vertical'
    });

    view.add(listView);
    self.add(view);

    return self;
}

module.exports = MainWindow;