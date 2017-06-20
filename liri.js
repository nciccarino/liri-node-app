//dependencies
var fs = require("fs"); 
var request = require("request"); 
var Twitter = require("twitter"); 
var Spotify = require("node-spotify-api"); 

//action and switch/case
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
};

//functon to log commands
function log() {
	fs.appendFile("log.txt", "\n" + action + "\n", function(err) {
		// If an error was experienced we say it.
    	if (err) {
    		console.log(err);
  		}

  		// If no error is experienced, we'll log the phrase "Content Added" to our node console.
  		else {
    		console.log("Content Added!");
    		console.log("-----------------------------");
  		}
	})
}; 

//node liri.js "my-tweets"
function twitter() {
	log(); 

	var keys = require("./keys.js"); 
	
	var client = new Twitter(keys.twitterKeys); 

	var params = {screen_name: "nciccarino"};
	client.get("statuses/user_timeline", params, function(error, tweets, responses) {
		if(!error) {
			for(var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text); 
				console.log(tweets[i].created_at); 
				console.log("-----------------------------");
				fs.appendFile("log.txt", "\n" + tweets[i].text + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})
				fs.appendFile("log.txt", "\n" + tweets[i].created_at + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})
			}
		}else{
			if(error){
				return console.log("Error Occurred: " + error); 
			}
		}
	})
	
};

//node liri.js "spotify-this-song" <"song name here">
function spotify() {
	//log();

	var keys = require("./keys.js"); 

	var client = new Spotify(keys.spotifyKeys); 

	var argv = process.argv[3]; 

	if (argv == undefined) {
		client.search({ type: "track", query: "All the Small Things" }, function(err, data) {
			if (err) {
				return console.log("Error Occurred: " + err); 
			}

			console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name); 
			console.log("Song's Name: " + data.tracks.items[0].name); 
			console.log("Preview Spotify Link: " + data.tracks.items[0].preview_url); 
			console.log("Album: " + data.tracks.items[0].album.name); 
			
		}) 

	}

	// else {
	// 	client.search({ type: "track", query: argv}, function(err, data) {
	// 		for (var i = 3; i < argv.length; i++) {
	// 			if (i >= 3 && i < argv.length) {

	// 			}
	// 		}
	// 	})
	// }

};

//node liri.js "movie-this" <"movie name here">
function omdb() {

};