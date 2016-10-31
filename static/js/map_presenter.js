/*
The code below controls the map view component that allows users to interact with the map and countries.
*/
var mapViewDOM = $("#map-view");

var map;
var geojson;
var selectedCountries = new Set();

// Initialize the map view.
var initializeMap = function() {
	if (map != undefined) {
		map.remove();
	}
    worldBounds = new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180));
    map = L.map(mapViewDOM[0], {
        maxBounds: worldBounds,
        maxBoundsViscosity: 1.0,
        worldCopyJump: true,
        zoomControl: false
    });

    // position zoom control buttons to top right corner
    L.control.zoom({
         position:'topright'
    }).addTo(map);

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

// Change the styles of the highlighted feature.
function highlightFeature(e) {
    var layer = e.target;
    var country = layer.feature.properties.name;
    if (selectedCountries.has(country)) {
        return;
    }

    layer.setStyle({
        weight: 2,
        color: 'rbga(251,240,228,0.5)',
        dashArray: '',
        fillOpacity: 0.3
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

// Reset the default styles of the given feature.
function resetHighlight(e) {
    var layer = e.target;
    var country = layer.feature.properties.name;
    if (selectedCountries.has(country)) {
        return;
    }
    geojson.resetStyle(layer);
}

// Handles a feature selection event.
// If the given feature is not currently selected, mark it as selected, and add to the set.
// If the given feature is  currently selected, remove from the set, and reset style. 
function selectFeature(e) {
    var layer = e.target;
    var country = layer.feature.properties.name;
    if (selectedCountries.has(country)) {
        selectedCountries.delete(country);
        unColorSelectedFeature(layer);
        removeCountryFromList(country);
    } else {
        selectedCountries.add(country);
        colorSelectedFeature(layer);
        appendCountryToList(country);
    }
}

// Change the styles of the selected feature.
function colorSelectedFeature(layer) {
    layer.setStyle({
        weight: 3,
        color: 'rgba(174,159,141,0.7)',
        dashArray: '',
        fillOpacity: 0.5
    });
}

// Reset the styles of the unselected feature.
function unColorSelectedFeature(layer) {
    geojson.resetStyle(layer);
}

// Define behaviors for different user interactions with a feature.
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: selectFeature
    });
}

map = initializeMap();
