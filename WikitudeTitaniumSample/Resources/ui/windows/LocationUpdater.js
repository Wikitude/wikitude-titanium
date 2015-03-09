var LocationUpdater = {
	
	/* Creates poi-data, which are passed over to JS / Wikitude SDK on first location update. */
	
	architectWindow: null,
	
	setArchitectWindow: function(architectWindow) {
		LocationUpdater.architectWindow = architectWindow;
	},
	
	onLocationUpdater: function(position) 
	{
	
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var altitude = position.coords.altitude;
		var placesAmount = 10;
		var poiData = [];
	
		// creates dummy poi-data around given lat/lon
		for (var i=0; i< placesAmount; i++) {
			poiData.push({ 'id': (i+1), 'longitude': longitude + 0.001 * ( 5 - LocationUpdater.getRandomInt(1,10) ), 'latitude' : latitude + 0.001 * (5 - LocationUpdater.getRandomInt(1,10)), 'description': 'This is the description of POI#'+(i+1), 'altitude' : 100.0, 'name': 'POI#'+(i+1)});
		}
		var jsSource = "World.loadPoisFromJsonData("+JSON.stringify(poiData)+");";
		
		LocationUpdater.architectWindow.callJavaScript(jsSource);
	},
	
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};