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
		text : 'Wikitude SDK Samples'
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
		title : 'Image Recognition',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			// new ArWindow('foo', 'http://goo.gl/Vs8Oc', geodata).open();
			new ArWindow('foo', '1_ImageRecognition_4_Bonus-Sparkles/index.html', geodata).open();
		}
	},
	{
		title : '3D and ImageRecognition',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			// new ArWindow('foo', 'http://goo.gl/Vs8Oc', geodata).open();
			new ArWindow('foo', '2_3dAndImageRecognition_1_3dModelOnTarget/index.html', geodata).open();
		}
	},
	{
		title : 'Selecting Places',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			// new ArWindow('foo', 'http://goo.gl/Vs8Oc', geodata).open();
			new ArWindow('foo', '3_PointOfInterest_4_SelectingPois/index.html', geodata).open();
		}
	},
	{
		title : 'Places from Webservice',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			// new ArWindow('foo', 'http://goo.gl/Vs8Oc', geodata).open();
			new ArWindow('foo', '4_ObtainPoiData_1_FromWebservice/index.html', geodata).open();
		}
	},
	{
		title : 'Solar System Demo',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			// new ArWindow('foo', 'http://goo.gl/Vs8Oc', geodata).open();
			new ArWindow('foo', '6_Demo_2_SolarSystem(Geo)/index.html', geodata).open();
		}
	}
	
	
	 ];

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
