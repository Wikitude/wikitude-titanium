function MainWindow() {

	var util = require('util');
	
	// http://www.wikitude.com/products/wikitude-sdk/pricing/
	var WikitudeLicenseKey = "TODO";

	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : false,
		title : 'Wikitude SDK Mode Samples',
		exitOnClose : true
	});
	
	var list = [{
		title : 'Image Recognition',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '1_ImageRecognition_4_Bonus-Sparkles/index.html', geodata).open();
		}
	},
	{
		title : '3D and ImageRecognition',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '2_3dAndImageRecognition_1_3dModelOnTarget/index.html', geodata).open();
		}
	},
	{
		title : 'Selecting Places',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '3_PointOfInterest_4_SelectingPois/index.html', geodata).open();
		}
	},
	{
		title : 'Places from Webservice',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '4_ObtainPoiData_1_FromWebservice/index.html', geodata).open();
		}
	},
	{
		title : 'Solar System Demo',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '6_Demo_2_SolarSystem(Geo)/index.html', geodata).open();
		}
	},
	{
		title : 'Launch World via Url',
		callback : function() {
			alert("open URL enter window");
		}
	},
	
	
	 ];

	var listView = Ti.UI.createTableView({
		data : list
	});

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
	
	
	var view = Ti.UI.createView({
    	height: '100%',
    	layout: 'vertical'
	});
	
	view.add(listView);
	self.add(view);
	
	
	


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
	 
	

	// backButton.addEventListener('click', function() {
		// self.close();
	// });

	return self;
}

module.exports = MainWindow;
