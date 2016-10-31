/*
The code below controls the introduction home page component.
*/

var homePageDOM = $("#homepage");
var startButtonDOM = $("#start-pin-button");

startButtonDOM.click(function() {
	homePageDOM.fadeOut(1000);
})
