var fs = require("fs"); 

var request = require("request"); 

var action = process.argv[2]; 

switch (action) {
	case "my-tweets":
		twitter();
		break;

	case "spotify-this-song":
		spotify();
		break;

	case "movie-this":
		omdb(); 
		break; 

	case "do-what-it-says":
		doWhatItSays();
		break; 
}

//node liri.js "my-tweets"

function twitter() {
	var fs = require("fs"); 
	var keys = require("./keys.js"); 
	//console.log(keys.twitterKeys); 
	var Tweet = require("twitter"); 
}

//node liri.js "spotify-this-song" <"song name here">
function spotify() {

}

//node liri.js "movie-this" <"movie name here">
function omdb() {

}