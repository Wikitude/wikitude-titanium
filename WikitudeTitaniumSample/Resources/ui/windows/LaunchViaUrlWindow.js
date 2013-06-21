function LaunchViaUrlWindow(WikitudeLicenseKey) {
	
	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		navBarHidden : false,
		title : 'Launch World via Url'
	});
	
	var view = Ti.UI.createView({
    	height: '100%',
    	layout: 'vertical'
	});
	
	var buttonLaunch = Titanium.UI.createButton({
	   title: 'Launch World',
	   top: 10,
	   width: '70%',
	   height: 50,
	   textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	   verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	buttonLaunch.addEventListener('click',function(e)
	{
		var url2launch = textField.value;
		
		if (url2launch.indexOf("://") == -1) {
			alert("Please enter valid url");
		} else {
			var ArWindow = require('/ui/windows/ArWindow');
			new ArWindow( WikitudeLicenseKey, url2launch).open();	
		}
			
	});	
	
	var textField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  top: 30, left: 10, right: 10,
	  width: '90%', height: 50,
	  hintText:'http://',
	  value: 'http://',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	view.add(textField);
	view.add(buttonLaunch);

	self.add(view);
	
	return self;
}

module.exports = LaunchViaUrlWindow;