function LaunchViaUrlWindow(WikitudeLicenseKey, windowTitle) {
	
	var self = null;
	
	if (Ti.Platform.name === 'android') {
		self = Ti.UI.createWindow({
			navBarHidden : false,
			title : windowTitle
		});
	}
	else {
		self = Ti.UI.createWindow({
			navBarHidden : false,
			title : windowTitle,
			backgroundColor : 'white',
			color: 'black'
		});
	}
	
	var view = Ti.UI.createView({
    	height: '100%',
    	layout: 'vertical',
	});
	
	var buttonLaunch = Titanium.UI.createButton({
	   title: 'Launch World',
	   top: 10,
	   width: '70%',
	   // height: 50,
	   textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	   verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	buttonLaunch.addEventListener('click',function(e)
	{
		var url2launch = textField.value;
		
		if (url2launch.indexOf("://") == -1) {
			alert("Please enter valid url");
		} else {
			var ARchitectWindow = require('/ui/windows/ARchitectWindow');

            var architectWindow = new ARchitectWindow(WikitudeLicenseKey, "IrAndGeo");
            if (architectWindow.isDeviceSupported()) {
                architectWindow.loadArchitectWorldFromURL(url2launch);
                architectWindow.open();
            } else {
                alert('not supported');
            }	
		}
			
	});	
	
	var textField = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  top: 60, left: 10, right: 10,
	  width: '90%', //height: 50,
	  hintText:'http://',
	  value: 'http://',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
	});
	
	var backButton = Ti.UI.createButton({
		title : 'Back',
		left : 6, top : 6, // height : 36, width : 64
		 
	});
	backButton.addEventListener('click', function() {
		self.close();
	});

	view.add(backButton);
	
	view.add(textField);
	view.add(buttonLaunch);

	self.add(view);
	
	return self;
}

module.exports = LaunchViaUrlWindow;