var listViewDOM = $("#list-view");
var pinnedListDOM = $("#pinned-country-list");

function appendCountryToList(countryName) {
	pinnedListDOM.append("<li>" + countryName + "</li>");
}

function removeCountryFromList(countryName) {
	var pinnedListItemDOM = pinnedListDOM.find("li");
	pinnedListItemDOM.filter(function() { 
		return $.text([this]) === countryName; 
	}).remove();
}
