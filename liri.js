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
		client.search({ type: "track", query: "The Sign Ace of Base" }, function(err, data) {
			if (err) {
				return console.log("Error Occurred: " + err); 
			}

			console.log("Artist(s): " + data.tracks.items[0].artists[0].name); 
			console.log("Song's Name: " + data.tracks.items[0].name); 
			console.log("Preview Spotify Link: " + data.tracks.items[0].preview_url); 
			console.log("Album: " + data.tracks.items[0].album.name); 
			console.log("DEFAULT: NO INPUT"); 

			fs.appendFile("log.txt", "\n" + "Artist(s): " + data.tracks.items[0].artists[0].name + "\n", function(err) {
				if(err) {
					console.log(err); 
				}
			})

			fs.appendFile("log.txt", "\n" + "Song's Name: " + data.tracks.items[0].name + "\n", function(err) {
				if(err) {
					console.log(err); 
				}
			})

			fs.appendFile("log.txt", "\n" + "Preview Spotify Link: " + data.tracks.items[0].preview_url + "\n", function(err) {
				if(err) {
					console.log(err); 
				}
			})

			fs.appendFile("log.txt", "\n" + "Album: " + data.tracks.items[0].album.name + "\n", function(err) {
				if(err) {
					console.log(err); 
				}
			})

			fs.appendFile("log.txt", "\n" + "DEFAULT: NO INPUT" + "\n", function(err) {
				if(err) {
					console.log(err); 
				}
			})
			
		}) 

	}

	else {
		client.search({ type: "track", query: argv}, function(err, data) {
			if (err) {
				return console.log("Error Occurred: " + err);
			}else{

				for (var key in data.tracks.items) {

					if (data.tracks.items[key].name == argv) {
						console.log("Artist(s): " + data.tracks.items[key].artists[key].name); 
						console.log("Song's Name: " + data.tracks.items[key].name); 
						console.log("Preview Spotify Link: " + data.tracks.items[key].preview_url); 
						console.log("Album: " + data.tracks.items[key].album.name); 

						fs.appendFile("log.txt", "\n" + data.tracks.items[key].artists[key].name + "\n", function(err) {
							if(err) {
								console.log(err); 
							}
						})

						fs.appendFile("log.txt", "\n" + "Artist(s): " + data.tracks.items[key].artist[key].name + "\n", function(err) {
							if(err) {
								console.log(err); 
							}
						})

						fs.appendFile("log.txt", "\n" + "Song's Name: " + data.tracks.items[key].name + "\n", function(err) {
							if(err) {
								console.log(err); 
							}
						})

						fs.appendFile("log.txt", "\n" + "Preview Spotify Link: " + data.tracks.items[key].preview_url + "\n", function(err) {
							if(err) {
								console.log(err); 
							}
						})

						fs.appendFile("log.txt", "\n" + "Album: " + data.tracks.items[key].album.name + "\n", function(err) {
							if(err) {
								console.log(err); 
							}
						})

					}

				}

			}

		})
	}

};

//node liri.js "movie-this" <"movie name here">
function omdb() {
	//log();

	var argv = process.argv[3]; 

	var def = "Mr. Nobody";  

	if (argv == undefined) {

	  	request("http://www.omdbapi.com/?t=" + def + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

			if (!error && response.statusCode === 200) {
				console.log("Title: " + JSON.parse(body).Title);
		  		console.log("Year: " + JSON.parse(body).Year); 
			    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
			    console.log("Country of Origin: " + JSON.parse(body).Country); 
			    console.log("Language: " + JSON.parse(body).Language); 
			    console.log("Plot Summary: " + JSON.parse(body).Plot); 
			    console.log("Actors: " + JSON.parse(body).Actors); 
			    //console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + argv);

			    fs.appendFile("log.txt", "\n" + "Title: " + JSON.parse(body).Title + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Year: " + JSON.parse(body).Year + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "The movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Country of Origin: " + JSON.parse(body).Country + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Language: " + JSON.parse(body).Language + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Plot Summary: " + JSON.parse(body).Plot + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Actors: " + JSON.parse(body).Actors + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

			}

		});

	}else{

		request("http://www.omdbapi.com/?t=" + argv + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

		  	if (!error && response.statusCode === 200) {
		  		console.log("Title: " + JSON.parse(body).Title);
		  		console.log("Year: " + JSON.parse(body).Year); 
			    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
			    console.log("Country of Origin: " + JSON.parse(body).Country); 
			    console.log("Language: " + JSON.parse(body).Language); 
			    console.log("Plot Summary: " + JSON.parse(body).Plot); 
			    console.log("Actors: " + JSON.parse(body).Actors); 
			    //console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + argv); 

			   	fs.appendFile("log.txt", "\n" + "Title: " + JSON.parse(body).Title + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Year: " + JSON.parse(body).Year + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "The movie's IMDB rating is: " + JSON.parse(body).imdbRating + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Country of Origin: " + JSON.parse(body).Country + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Language: " + JSON.parse(body).Language + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Plot Summary: " + JSON.parse(body).Plot + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

				fs.appendFile("log.txt", "\n" + "Actors: " + JSON.parse(body).Actors + "\n", function(err) {
					if(err) {
						console.log(err); 
					}
				})

			}

		}); 

	}

}; //function 

//node liri.js do-what-it-says
function doWhatItSays() {

	var argv = process.argv[3]; 

	fs.readFile("random.txt", "utf8", function(error, data) {

		if(error) {
			return console.log("Error: " + error); 
		}

		var dataArr = data.split(", "); 

		spotify(dataArr[1]); //can't figure out how to set it to process.argv[3]

	})

}; //function 