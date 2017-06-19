//dependencies
var fs = require("fs"); 
var request = require("request"); 
var Twitter = require("twitter"); 

//action
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

// //functon to log commands
// function log() {
// 	fs.appendFile(log.txt, "\n" + action + "\n", function(err) {
// 		// If an error was experienced we say it.
//     	if (err) {
//     		console.log(err);
//   		}

//   		// If no error is experienced, we'll log the phrase "Content Added" to our node console.
//   		else {
//     		console.log("Content Added!");
//   		}
// 	})
// }; 


//node liri.js "my-tweets"

function twitter() {
	//log(); 

	var fs = require("fs"); 
	var keys = require("./keys.js"); 
	
	var client = new Twitter(keys.twitterKeys); 

	// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
	//    console.log(tweets);
	// });

	var params = {screen_name: "nciccarino"};
	client.get("statuses/user_timeline", params, function(error, tweets, responses) {
		if(!error) {
			for(var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text); 
				console.log(tweets[i].created_at); 
				console.log("-----------------------------");
			}
		}
	})
	
};

//node liri.js "spotify-this-song" <"song name here">
function spotify() {

};

//node liri.js "movie-this" <"movie name here">
function omdb() {

};