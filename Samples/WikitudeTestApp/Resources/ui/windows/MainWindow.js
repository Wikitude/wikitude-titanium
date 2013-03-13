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

	var mainView = Ti.UI.createView({
		backgroundColor : '#ffffff',
		bottom : 0, left : 0, right : 0, top : 48
	});
	self.add(mainView);

	

	function randomFromInterval(from, to) {
    	return Math.random() * (to - from) + from;
	}

	var geodata = [], n = 50;

     // you may create poi data here and inject them later on
	/* 
	for (var i = 0; i < n; i++) {
		geodata.push({
			'name' : 'POI ' + i,
			'latitude' : randomFromInterval(45.994624840860446, 46.164662875910935),
			'longitude' : randomFromInterval(10.92071533203125, 11.31011962890625)
		});
	}
	*/
	 
	var list = [{
		title : 'AR sample world',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow('foo', 'http://goo.gl/Vs8Oc', geodata).open();
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
