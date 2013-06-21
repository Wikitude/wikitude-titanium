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
			new ArWindow( WikitudeLicenseKey, '1_ImageRecognition_4_Bonus-Sparkles/index.html').open();
		}
	},
	{
		title : '3D and ImageRecognition',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '2_3dAndImageRecognition_1_3dModelOnTarget/index.html').open();
		}
	},
	{
		title : 'Selecting Places',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '3_PointOfInterest_4_SelectingPois/index.html').open();
		}
	},
	{
		title : 'Places from Webservice',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '4_ObtainPoiData_1_FromWebservice/index.html').open();
		}
	},
	{
		title : 'Solar System Demo',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, '6_Demo_2_SolarSystem(Geo)/index.html').open();
		}
	},
	{
		title : 'Launch World via Url',
		callback : function() {
			
			var LaunchViaUrlWindow = require('/ui/windows/LaunchViaUrlWindow');
			new LaunchViaUrlWindow( WikitudeLicenseKey ).open();
		}
	}];

	var listView = Ti.UI.createTableView({
		data : list
	});

	listView.addEventListener('click', function(e) {
		list[e.index].callback();
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
