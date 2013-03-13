function MainWindow() {

	var util = require('util');

	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : true,
		title : 'MainWindow',
		exitOnClose : true
	});

	var headView = Ti.UI.createView({
		backgroundColor : '#f2f2f2',
		left : 0, right : 0, top : 0,
		height : 48
	});
	self.add(headView);

	var headLabel = Ti.UI.createLabel({
		text : 'MAIN'
	});
	headView.add(headLabel);

	// var backButton = Ti.UI.createButton({
		// title : 'Back',
		// left : 6, top : 6,
		// height : 36, width : 64
	// });
	// headView.add(backButton);

	var mainView = Ti.UI.createView({
		backgroundColor : '#ffffff',
		bottom : 0, left : 0, right : 0, top : 48
	});
	self.add(mainView);

	var geodata = [], n = 50;

	function randomFromInterval(from, to) {
    	return Math.random() * (to - from) + from;
	}

	for (var i = 0; i < n; i++) {
		geodata.push({
			'name' : 'POI ' + i,
			'latitude' : randomFromInterval(45.994624840860446, 46.164662875910935),
			'longitude' : randomFromInterval(10.92071533203125, 11.31011962890625)
		});
	}

	var list = [{
		title : 'AR sample world',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow('foo', 'ar/geo.html', geodata).open();
		}
	}, {
		title : 'IR sample world',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow('foo', 'ar/vision.html').open();
		}
	}];

	var listView = Ti.UI.createTableView({
		data : list
	});

	mainView.add(listView);

	listView.addEventListener('click', function(e) {
		list[e.index].callback();
	});

	if (util.isAndroid())
		self.addEventListener('android:back', function() {
			self.close();
		});

	self.addEventListener('close', function() {
		if (util.isAndroid())
			Titanium.Android.currentActivity.finish();
	});

	// backButton.addEventListener('click', function() {
		// self.close();
	// });

	return self;
}

module.exports = MainWindow;
