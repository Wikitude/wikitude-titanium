var LocationUpdater = {
	
	/* Creates poi-data, which are passed over to JS / Wikitude SDK on first location update. */
	/* in this function we generate poi data that will then be injected once the example is fully loaded. The injection is done in the 'injectGeneratedPoiJsonData' function defined in this file. */
	architectWindow: null,
	poiData: [],
	
	setArchitectWindow: function(architectWindow) {
		LocationUpdater.architectWindow = architectWindow;
		LocationUpdater.architectWindow.addEventListener('WORLD_IS_LOADED', LocationUpdater.injectGeneratedPoiJsonData);
	},
	
	onLocationUpdated: function(position) 
	{
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var altitude = position.coords.altitudeAccuracy !== null ? position.coords.altitude : -32768.0;
		var placesAmount = 10;
		LocationUpdater.poiData = [];
	
		// creates dummy poi-data around given lat/lon
		for (var i=0; i< placesAmount; i++) {
			LocationUpdater.poiData.push({ 'id': (i+1), 'longitude': longitude + 0.001 * ( 5 - LocationUpdater.getRandomInt(1,10) ), 'latitude' : latitude + 0.001 * (5 - LocationUpdater.getRandomInt(1,10)), 'description': 'This is the description of POI#'+(i+1), 'altitude' : altitude, 'name': 'POI#'+(i+1)});
		}				
	},
	
	injectGeneratedPoiJsonData: function() {
		if ( LocationUpdater.poiData.length > 0 ) {
			var jsSource = "World.loadPoisFromJsonData("+JSON.stringify(LocationUpdater.poiData)+");";		
			LocationUpdater.architectWindow.callJavaScript(jsSource);
		}
	},
	
	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
};

module.exports = LocationUpdater;