

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
    
    Ti.include("/ui/windows/ModelStorage.js");

    var list = [];

    var defaultFontSize = Ti.Platform.name === 'android' ? 24 : 18;

    var i = 0;

    // add samples to list
    for (i = 0; i < modelStorage.length; i++) {

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
            text: modelStorage[i].windowTitle,
            left: 10,
            top: 6,
            // height: defaultFontSize+10
        });

        row.add(labelSample);

        row.callback = function(index) {
            var SamplesListWindow = require('/ui/windows/SamplesListWindow');
            new SamplesListWindow(WikitudeLicenseKey, modelStorage[index].window_title, modelStorage[index].samples).open();
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