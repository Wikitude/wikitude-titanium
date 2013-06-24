var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		// Initialize Tracker
		this.tracker = new AR.Tracker("assets/magazine.wtc", {
			onLoaded: this.worldLoaded
		});

		// Button image
		this.imgButton = new AR.ImageResource("assets/wwwButton.jpg");


		// Sparkles
		var imgSparkles = new AR.ImageResource("assets/imageSparkles.png");
		var sparkles = new AR.AnimatedImageDrawable(imgSparkles, 0.25, 128, 128, {
			offsetX: -0.2,
			offsetY: 0.5,
			rotation: 75
		});
		sparkles.animate([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 100, -1);

		// Create overlay for page one
		var imgOne = new AR.ImageResource("assets/imageOne.png");
		var overlayOne = new AR.ImageDrawable(imgOne, 1, {
			offsetX: -0.15,
			offsetY: 0
		});
		var pageOneButton = this.createWwwButton("http://n1sco.com/specifications/", 0.1, {
			offsetX: -0.25,
			offsetY: -0.25,
			zOrder: 1
		});
		var pageOne = new AR.Trackable2DObject(this.tracker, "pageOne", {
			drawables: {
				cam: [overlayOne, pageOneButton, sparkles]
			}
		});

		// Create overlay for page two
		var imgTwo = new AR.ImageResource("assets/imageTwo.png");
		var overlayTwo = new AR.ImageDrawable(imgTwo, 0.5, {
			offsetX: 0.12,
			offsetY: -0.01
		});
		var pageTwoButton = this.createWwwButton("http://goo.gl/qxck1", 0.15, {
			offsetX: 0,
			offsetY: -0.25,
			zOrder: 1
		});
		var pageTwo = new AR.Trackable2DObject(this.tracker, "pageTwo", {
			drawables: {
				cam: [overlayTwo, pageTwoButton]
			}
		});
	},

	createWwwButton: function createWwwButtonFn(url, size, options) {
		options.onClick = function() {
			AR.context.openInBrowser(url);
		};
		return new AR.ImageDrawable(this.imgButton, size, options);
	},

	worldLoaded: function worldLoadedFn() {
		document.body.removeChild(document.getElementById('loadingMessage'));
	}
};

World.init();