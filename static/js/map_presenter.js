var mapViewDOM = $("#map_view");

var map;
var geojson

var initializeMap = function() {
	if (map != undefined) {
		map.remove();
	}
    worldBounds = new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180));
    map = L.map(mapViewDOM[0], {
        maxBounds: worldBounds,
        maxBoundsViscosity: 1.0,
        worldCopyJump: true
    });

    var initLat = 25.0;
    var initLng = 0.0;
    var initZoomLevel = 2;
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
	geojson = L.geoJson(countriesData, {
	    onEachFeature: onEachFeature
	}).addTo(map);
    return map;
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}



map = initializeMap();