var FOODIE = FOODIE || {};

$(document).ready(function(){
	getFoodDescriptors();
});

function initializeMashupGenerator() {
	$(".mashup-button").on("click", function(){
		$(".mashup-name").html(generateFlavorMashup());
	});

	$(".mashup-name").html(generateFlavorMashup());

	console.log("There once was a robot of flavor\nWhose recipes everyone savored\nBut one vile stew\nMade everyone spew\nIts mashups soon fell out of favor\n\ntwitter.com/FlavorMashupBot");
}

function getFoodDescriptors() {
	$.getJSON("assets/js/groups.json", function(data){
		FOODIE.groups = data;
		initializeMashupGenerator();
	}).fail( function(data, textStatus, error) {
        console.error("getJSON failed, status: " + textStatus + ", error: "+error)
    });;
}

function generateFlavorMashup() {
	var adjective = DL_Util.getRandomInt(0, 1);
	var numberOfMinorComponents = DL_Util.getRandomInt(1, 3);
	var majorComponentModifier = DL_Util.getRandomInt(0, 1);
	
	var mashup = "";

	if (adjective > 0) {
		mashup += DL_Util.randFromArray(FOODIE.groups.adjectives);
		mashup += " ";
	}

	for (i = 0; i < numberOfMinorComponents; i++) {
		mashup += DL_Util.randFromArray(FOODIE.groups.minorComponents);
		mashup += " ";
	}

	if (majorComponentModifier > 0) {
		mashup += DL_Util.randFromArray(FOODIE.groups.majorComponentsModifiers);
		mashup += " ";
	}

	mashup += DL_Util.randFromArray(FOODIE.groups.majorComponents);

	return mashup;
}