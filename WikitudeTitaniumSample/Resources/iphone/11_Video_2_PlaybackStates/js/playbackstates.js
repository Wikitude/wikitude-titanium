var World = {

    init: function initFn() {
        this.createOverlays();
    },

    createOverlays: function createOverlaysFn() {
        /*
            First a AR.TargetCollectionResource is created with the path to the Wikitude Target Collection(.wtc) file.
            This .wtc file can be created from images using the Wikitude Studio. More information on how to create them
            can be found in the documentation in the TargetManagement section.
            Each target in the target collection is identified by its target name. By using this
            target name, it is possible to create an AR.ImageTrackable for every target in the target collection.
         */
        this.targetCollectionResource = new AR.TargetCollectionResource("assets/magazine.wtc", {
            onError: World.onError
        });

        /*
            This resource is then used as parameter to create an AR.ImageTracker. Optional parameters are passed as
            object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once
            the tracker loaded all of its target images this callback function is invoked. We also set the callback
            function for the onError trigger which provides a sting containing a description of the error.
         */
        this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
            onTargetsLoaded: World.showInfoBar,
            onError: World.onError
        });

        /* Create play button which is used for starting the video. */
        var playButtonImg = new AR.ImageResource("assets/playButton.png", {
            onError: World.onError
        });
        var playButton = new AR.ImageDrawable(playButtonImg, 0.3, {
            enabled: false,
            clicked: false,
            zOrder: 2,
            onClick: function playButtonClicked() {
                World.video.play(1);
                World.video.playing = true;
                playButton.clicked = true;
            },
            translate: {
                y: -0.3
            }
        });

        /*
            Besides images, text and HTML content you are able to display videos in augmented reality. With the
            help of AR.VideoDrawables you can add a video on top of any image, object or instant recognition target
            (AR.ImageTrackable, AR.ObjectTrackable or AR.InstantTrackable) or have it displayed at any geo location
            (AR.GeoObject).
            Like any other drawable you can position, scale, rotate and change the opacity of the video drawable.

            The video we use for this example is "video.mp4". As with all resources the video can be loaded locally
            from the application bundle or remotely from any server. In this example the video file is already
            bundled with the application.

            The URL and the size are required when creating a new AR.VideoDrawable. Optionally translate, rotate and
            scale can be  set to position the video on the target.

            The class AR.VideoDrawable offers functions and triggers to control playback of the video and get
            notified of playback states. The following implementation makes use of the triggers and states to
            display an image of a play button on top of the target. Once the user clicks the play button the video
            starts to play. Additionally the video will be paused/resumed whenever the target is lost so the user
            does not miss any video content when looking away.

            Once the user clicks the button the video is played once: video.play(1). Starting the playback fires
            the onPlaybackStarted trigger and hides the playButton. When playback finishes the onFinishedPlaying
            trigger is called that shows the playButton again.

            To give the user the possibility to pause the video the AR.VideoDrawable's click trigger is used. If
            the video is playing and the user is clicking the function pause() is called which then pauses
            playback. Clicking the video again resumes playback.
        */
        this.video = new AR.VideoDrawable("assets/video.mp4", 0.40, {
            translate: {
                y: playButton.translate.y
            },
            zOrder: 1,
            onLoaded: function videoLoaded() {
                playButton.enabled = true;
            },
            onPlaybackStarted: function videoPlaying() {
                playButton.enabled = false;
                World.video.enabled = true;
            },
            onFinishedPlaying: function videoFinished() {
                playButton.enabled = true;
                World.video.playing = false;
                World.video.enabled = false;
            },
            onClick: function videoClicked() {
                if (playButton.clicked) {
                    playButton.clicked = false;
                } else if (World.video.playing) {
                    World.video.pause();
                    World.video.playing = false;
                } else {
                    World.video.resume();
                    World.video.playing = true;
                }
            },
            onError: World.onError
        });

        /*
            Adding the video to the image target is straight forward and similar like adding any other drawable to
            an image target.

            To start the video immediately after the target is recognized we call play inside the onImageRecognized
            trigger. Supplying -1 to play tells the Wikitude SDK to loop the video infinitely. Choose any positive
            number to re-play it multiple times.

            Similar to the user clicking on the video we want to pause/resume the playback if the target image is
            lost - as this means the user is currently not actively watching the video. To accomplish this the
            onImageRecognized and onImageLost triggers of the AR.ImageTrackable are used:
        */
        this.trackable = new AR.ImageTrackable(this.tracker, "pageOne", {
            drawables: {
                cam: [World.video, playButton]
            },
            onImageRecognized: function onImageRecognizedFn() {
                if (World.video.playing) {
                    World.video.resume();
                }
                World.hideInfoBar();
            },
            onImageLost: function onImageLostFn() {
                if (World.video.playing) {
                    World.video.pause();
                }
            },
            onError: World.onError
        });
    },

    onError: function onErrorFn(error) {
        alert(error)
    },

    hideInfoBar: function hideInfoBarFn() {
        document.getElementById("infoBox").style.display = "none";
    },

    showInfoBar: function worldLoadedFn() {
        document.getElementById("infoBox").style.display = "table";
        document.getElementById("loadingMessage").style.display = "none";
    }
};

World.init();