var mapViewDOM = $("#map_view");

var map;

var initializeMap = function() {
	if (map != undefined) {
		map.remove();
	}
    map = L.map(mapViewDOM[0]);
    var initLat = 37.403122;
    var initLng = -121.969930;
    var initZoomLevel = 11;
    map.setView([initLat, initLng], initZoomLevel);

	var mapBoxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}';
	var mapBoxToken = 'pk.eyJ1IjoiYmlndG9ueXNheXNoaSIsImEiOiJjaXUxdjJrOWUwZTE1Mm5ydDNmbW4wOTY4In0.FwubLOhuqpz_V0FumvG_CQ';

	var mapBoxLightUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}'
	var mapBoxLightToken = 'pk.eyJ1IjoiYmlndG9ueXNheXNoaSIsImEiOiJjaXUxdjBqZzEwZmF4MnRwbDY0czZsNzVwIn0.W2DMNlQuuBMRQo5IfocE-w';
	var mapBoxAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>';
    L.tileLayer(mapBoxLightUrl, {
	    attribution: mapBoxAttr,
	    maxZoom: 18,
	    id: 'mapbox.satellite',
	    accessToken: mapBoxLightToken
	}).addTo(map);
    return map;
}

map = initializeMap();