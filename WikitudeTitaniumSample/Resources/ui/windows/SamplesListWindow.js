function SamplesListWindow(WikitudeLicenseKey, windowTitle, samples) {

	var _this = this;

	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : false,
		title : windowTitle,
	});
	
	this.samples = samples;

	var list = [];

	for (var i=0; i<this.samples.length; i++) {
		list.push( 
			{ 	title: _this.samples[i].title, 
				callback : function(index) {
					var ARchitectWindow = require('/ui/windows/ARchitectWindow');
					new ARchitectWindow( WikitudeLicenseKey, _this.samples[index].file).open();
				}
			}
		);
	}
	
	var listView = Ti.UI.createTableView({
		data : list
	});

	listView.addEventListener('click', function(e) {
		list[e.index].callback(e.index);
	});

	var view = Ti.UI.createView({
    	height: '100%',
    	layout: 'vertical'
	});
	
	view.add(listView);
	self.add(view);

	return self;
}

module.exports = SamplesListWindow;
