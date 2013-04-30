
Titanium.UI.setBackgroundColor('#ffffff');

var wikitude = require('com.wikitude.ti');

var window = Ti.UI.createWindow({
	navBarHidden : true,
	title : 'WIKITUDE WINDOW',
	exitOnClose : true
});

var headView = Ti.UI.createView({
	backgroundColor : '#f2f2f2',
	left : 0, right : 0, top : 0,
	height : 48
});
window.add(headView);

var headLabel = Ti.UI.createLabel({
	text : 'WIKITUDE WINDOW'
});
headView.add(headLabel);

var mainView = Ti.UI.createView({
	backgroundColor : '#ffffff',
	bottom : 0, left : 0, right : 0, top : 48
});
window.add(mainView);

var arview = wikitude.createWikitudeView({
	licenseKey : 'foo',
	bottom : 0, left : 0, right : 0, top : 0
});
mainView.add(arview);

if (Ti.Platform.osname == 'android') {
	window.addEventListener('close', function() {
		Titanium.Android.currentActivity.finish();
	});
	window.addEventListener('android:back', function() {
		window.close();
	});
}

window.open();
