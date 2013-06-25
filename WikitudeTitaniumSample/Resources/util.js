
var _isAndroid = undefined;

exports.isAndroid = function() {
	if (_isAndroid === undefined)
		_isAndroid = (Ti.Platform.osname == 'android');
	return _isAndroid;
};
