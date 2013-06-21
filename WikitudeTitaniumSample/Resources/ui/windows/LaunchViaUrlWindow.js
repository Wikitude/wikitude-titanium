function LaunchViaUrlWindow(WikitudeLicenseKey) {

	var util = require('util');
	
	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : false,
		title : 'Wikitude SDK Mode Samples'
	});
	
	var list = [{
		title : 'Solar System in Dropbox',
		callback : function() {
			var ArWindow = require('/ui/windows/ArWindow');
			
			// TODO build UI around that
			var url2launch = 'https://dl.dropboxusercontent.com/u/1588973/titaniumtest/6_Demo_2_SolarSystem%28Geo%29/index.html';
			new ArWindow( WikitudeLicenseKey, url2launch).open();
		}
	}
	
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
	
	return self;
}

module.exports = LaunchViaUrlWindow;
