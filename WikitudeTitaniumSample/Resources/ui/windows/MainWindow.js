

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
    var WikitudeLicenseKey = "NGBXvYi66YY4pT3CqeLvcv31N9xl4uasQSZwF5xPfJ5lcrI5leTkRrzzVihYTbEbRWRf9S9hWqkeCykxd1IgU/qbg5WJjwSK7dk9f/zHwlV1Qa/JYIB6l+sh2OjrdrXO7E9Qdqih1RYGF+3MDt7CC3BmMUrhkFanOvCf/eXMmX1TYWx0ZWRfX6PikQ4qQBjn7mRR7l4e36y3jrIqcuQfE4vdeKCDiD2pePwQ41U/FnA7HSShjqq9TcTpQaASuWQL+nnrKUU3ybpck+50zKokc0nK6tX0rjqAE3cKZJIXMV1VRszX2rUJFFzM80eMWNQ2FN6I3e0LlyY3gkAt05XUiTq4YaOVb62gRlytIPNvaxwFoj3Xvh5+vR4afdbKAgdAlxT4KLazRObTUBuYHWeKU9/cXR4RagzSDUt+mpYzEVpZTB8OjGFWKf+j+5kCRrQ/ra4gYIuf3KqYFy0JsuAeN2keaI5M34saqcTNSUV7Ng1V/ZjJg9Ac56TLC+D1FuMDdpZ6c3eWTsaccwc4tMmnyiA8Y60GqXIeFOClE1locWR0Fu/MXmOkoFSXGy/ldfzVOo756Mhb4xCSTvbN+PUKbyM9EYWrmj3Yu88wxglud9L+G8etmi+Mr1wO4SGCfIQdzu1Pt9go8QhZpIB7Nyk1IirWW99b10Kzh8rW1fj8ReVBddHb4SU5+r2/CmAUMrbohodJFBefpbagBhQ7EV8sg/1ylBYaNVXUi3bfCt437rcwNniWV6/Pm4thryejMMflAji9gp+TgioY4r1ex6LDzzzRrHGZ+Qypwrm41oxWpz5Gw4hbkeakbqhVT7AgTq2bvQ++Gkksaw5RO54rIzuh2QOu1Ad+XY81VHLYMnudcLzWuY3WcrQEqgQ/jRIGOH4ZywKTOqtXozF4Us85z5CWHfdESc2foe68ZbOem/pn7a9Hk+foWy9oFp8/0lEKjoVCZp264eeU7EsdQoHNnPDq8w3UZSfVGd3sOytAIQAkeFER/5GNQBXM+gsoCU3cd5Wrfvj9LHrC223CqdDENpyVc2uHc+RfyOAhXMZxtw0+Hi2etkJXkC+6y4ncxwKt8wlThhBtpDfgE0wB6wZ0sHLE+fmK7LOSUipj8qc7s6sD01la+xHL7yrcpWDJIJ46cgiycaVb7AWSW5c8wXpKK+i/JgI8IDVDPqMFZVfhFhfW8jg=";

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

    var defaultFontSize = Ti.Platform.name === 'android' ?  15 : 18;

    var i = 0;

    // add samples to list
    for (i = 0; i < modelStorage.length; i++) {

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
        height: defaultFontSize * 2,
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