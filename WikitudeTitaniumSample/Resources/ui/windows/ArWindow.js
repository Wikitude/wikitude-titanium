function ArWindow(key, url) {

	/* Member Variables */
	var licenseKey = key;
	var worldUrl = url;
	var arview = null;


	/* initial view setup */
	var jsuri = require('jsuri-1.1.1'),
		util = require('util'),
		wikitude = require('com.wikitude.ti');

	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : true,
		title : 'ArWindow'
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
		left : 6, top : 6,
		height : 36, width : 64
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


	/* lifecycle handling */
	self.addEventListener('open', function() {

		arview = wikitude.createWikitudeView({
			licenseKey : licenseKey,
			bottom : 0, left : 0, right : 0, top : 0
		});

		mainView.add(arview);

		arview.addEventListener('URL_WAS_INVOKED', onUrlWasInvoked); // setup event listener

		arview.architectWorldUri = url; // load ARchitect world

	});

	self.addEventListener('close', function() {

		if (arview !== null) {

			arview.removeEventListener('URL_WAS_INVOKED', onUrlWasInvoked); // useless, since arview is then destroyed

			mainView.remove(arview);
			arview = null;
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
		// TODO handle if used insude your AR experience
	};


	return self;
}

module.exports = ArWindow;
