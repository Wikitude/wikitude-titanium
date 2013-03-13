function DetailWindow() {

	var self = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		title : 'DetailWindow'
	});

	var headView = Ti.UI.createView({
		backgroundColor : '#f2f2f2',
		left : 0, right : 0, top : 0,
		height : 48
	});
	self.add(headView);

	var headLabel = Ti.UI.createLabel({
		text : 'SOME DETAIL'
	});
	headView.add(headLabel);

	var backButton = Ti.UI.createButton({
		title : 'Back',
		left : 6, top : 6,
		height : 36, width : 64
	});
	headView.add(backButton);

	var mainView = Ti.UI.createView({
		backgroundColor : '#ffffff',
		bottom : 0, left : 0, right : 0, top : 48
	});
	self.add(mainView);

	var mainLabel = Ti.UI.createLabel({
		text : 'Touch anywhere to go back',
		touchEnabled : false
	});
	mainView.add(mainLabel);

	mainView.addEventListener('click', function(event) {
		self.close();
	});

	backButton.addEventListener('click', function(event) {
		self.close();
	});

	return self;
}

module.exports = DetailWindow;
