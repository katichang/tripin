/*
The code below controls the list view component that shows user selected countries.
*/

var listViewDOM = $("#list-view");
var pinnedListDOM = $("#pinned-country-list");

// Append a country as a list item to the list view.
function appendCountryToList(countryName) {
	pinnedListDOM.append("<li>" + countryName + "</li>");
}

// Remove the list item containing the given country name.
function removeCountryFromList(countryName) {
	var pinnedListItemDOM = pinnedListDOM.find("li");
	pinnedListItemDOM.filter(function() { 
		return $.text([this]) === countryName; 
	}).remove();
}
