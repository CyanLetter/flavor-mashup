var live = true;
var tweetInterval = 10800000;
// flavorblastedjavascript

var config = require('./config.json');
var fs = require('fs');
var TwitterBot = require("node-twitterbot").TwitterBot;
var foodieData = require('./js/groups.json');

// Include your access information below
var Bot = new TwitterBot({
  "consumer_secret": config.twitter_credentials.consumer_secret,
  "consumer_key": config.twitter_credentials.consumer_key,
  "access_token": config.twitter_credentials.access_token,
  "access_token_secret": config.twitter_credentials.access_token_secret
});

// Bot.tweet("Are you ready for a flavor adventure?");

function makeNewMashup() {
	var newTweet = generateFlavorMashup();
	console.log(newTweet);

	if (live === true) {
		Bot.tweet(newTweet);
	}
}

function generateFlavorMashup() {
	var adjective = getRandomInt(0, 1);
	var majorComponentModifier = getRandomInt(0, 1);
	var numberOfMinorComponents = getRandomInt(1, 3);
	var introOutro = getRandomInt(0, 1);
	
	var mashup = "";

	if (adjective > 0) {
		mashup += randFromArray(foodieData.adjectives);
		mashup += " ";
	}

	for (var i = 0; i < numberOfMinorComponents; i++) {
		mashup += randFromArray(foodieData.minorComponents);
		mashup += " ";
	}

	if (majorComponentModifier > 0) {
		mashup += randFromArray(foodieData.majorComponentsModifiers);
		mashup += " ";
	}

	mashup += randFromArray(foodieData.majorComponents);

	mashup = toTitleCase(mashup);

	if (introOutro > 0) {
		mashup += ", ";
		mashup += randFromArray(foodieData.outros);
	} else {
		mashup = randFromArray(foodieData.intros) + " " + mashup;
	}

	return mashup;
}

function randFromArray (array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

Bot.startStreaming();
Bot.listen("listening", senpaiNoticedMe, function(twitter, action, tweet) {
	var newMashup = generateFlavorMashup();

	var newTweet = "@" + tweet.user.screen_name + ", " + newMashup;

	console.log(newTweet);
	if (live === true) {
		Bot.tweet(newTweet);
	}
});

function senpaiNoticedMe(tweet) {
	if (tweet.in_reply_to_screen_name != null) {
		if (tweet.in_reply_to_screen_name == "FlavorMashupBot") {
			return true;
		}
		
	}
	// console.log(tweet.entities.user_mentions[0].screen_name);
	// console.log(tweet);
	return false;
}

// makeNewMashup();
setInterval(makeNewMashup, tweetInterval);