function ArWindow(key, url, data) {

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

	headView.add(backButton);

	var mainView = Ti.UI.createView({
		backgroundColor : '#ffffff',
		bottom : 0, left : 0, right : 0, top : 48
	});

	self.add(mainView);

	var arview = null;

	var onUrlWasInvoked = function(event) { // event callback

		var uri = new jsuri.Uri(event.url);

		if (uri.host() == 'documentready') // load data
			if (data)
				arview.js = 'loadData(' + JSON.stringify(data) + ')';

		if (uri.host() == 'detail') { // open detail window
			var DetailWindow = require('/ui/windows/DetailWindow');
			new DetailWindow().open();
		}

	};

	var architectWorldUri = null;

	if (util.isAndroid()) {
		architectWorldUri = url;
	} else {
		var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, url);
		architectWorldUri = file.nativePath;
	}

	self.addEventListener('open', function() {

		arview = wikitude.createWikitudeView({
			licenseKey : 'foo',
			bottom : 0, left : 0, right : 0, top : 0
		});

		mainView.add(arview);

		arview.addEventListener('URL_WAS_INVOKED', onUrlWasInvoked); // setup event listener

		setTimeout(function() {
			if (architectWorldUri)
				arview.architectWorldUri = architectWorldUri; // load ARchitect world
		}, 2 * 1000);

	});

	self.addEventListener('close', function() {

		if (arview != null) {

			arview.removeEventListener('URL_WAS_INVOKED', onUrlWasInvoked); // useless, since arview is then destroyed

			mainView.remove(arview);
			arview = null;

		}

	});

	if (util.isAndroid())
		self.addEventListener('android:back', function() {
			self.close();
		});

	backButton.addEventListener('click', function() {
		self.close();
	});

	return self;
}

module.exports = ArWindow;
