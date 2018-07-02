

// 
require("dotenv").config();

//code required to link key.js file which has API keys for Twitter/Spotify and store it in a variable
var keys = require('./keys.js');

// Variables for twitter, to require API
var Twitter = require('twitter');

// Variable for spotify, to require API
var Spotify = require('node-spotify-api');

//Variable to require fs package
var fs = require('fs');

//Variable to require request package
var request = require("request");

//Variable to access and require Spotify  API's with id, key and secret keys
var spotify = new Spotify(keys.spotify);


// function to write to log.txt file
var getArtistNames = function(artist) {
    return artist.name;
  };
  


//Function to display my twitter feed
var psuedoTweets = function() {
    //grabs the twitter API key and secret keys
    var client = new Twitter(keys.twitter);
    // Variable for my twitter account 
    var myTweetAccount = {
        screen_name: 'nodeMorpha'
    };
    //Use get method of clients , get function takes three arguments from twitter feed
    // Creates 3 params within function error, tweets, and response.
    client.get('statuses/user_timeline', myTweetAccount, function(error,tweets, response) {
            if (!error) {
            // if there are no errors run for loop with tweet data up to 25 times
                for (var i = 0; i < tweets.length; i++) {
                    var feed = tweets[i].created_at;
                    console.log("@MorphaNode: " + tweets[i].text + feed.substring(0,24));
                    console.log("");
                    console.log(tweets[i].text);

                }
            }
        });
    };

    //Variable to grab Spotify API
    var mySpotify = function(songTitle){
        //if songTitle is undefined default to "Dark Steering"
        if (songTitle === undefined) {
            songTitle = "Dark Steering";
        }
        //Search query for songTitle
        spotify.search( 
            { 
                type: "track",
                query: songTitle
            },
            //function to notify caller of results or errors
            function(err, data) {
                if (err) {
                    console.log("Error occured: " + err);
                    return;
                }
            // Variable for song data
                var songs = data.tracks.items;
                // For loop that will console.log song data
                for (var i = 0; i < songs.lenth; i++) {
                    console.log(i);
                    console.log("artist(S): " + songs[i].artists.map(getArtistNames));
                    console.log("song name: " + songs[i].name);
                    console.log("preview song: " + songs[i].preview_url);
                    console.log("album: " + songs[i].album.name);
                    console.log("-----------------------------------");
            
                }
            }
        )
    };

    // Variable for IMDB movie titles with function that will default to Mr. Nobody data if undefined
    var movieSearch = function(movieTitle) {
        if (movieTitle === undefined) {
            movieTitle = "Mr. Nobody";
        }
        // URL link for movieTitle data with API key
        var urlSearch =  "http://www.omdbapi.com/?i=tt3896198&apikey=42843144" + movieTitle + "&y=&plot=full&tomatoes=true&apikey=trilogy";

        // Search request that has 3 params and if there are no errors it should respond with data from IMDB server
        request(urlSearch, function(error, response, data) {
            if(!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
            
            // Get data that will output movie data from omdb API
            /** Should log 
            * Title of moive 
            * Year it came out.
            * IMDB rating of movie.
            * Country where the movie was produced
            * Language of movie.
            * Plot
            * Actors
            * Rotten Tomato Rating
            */
                console.log("Title: " + jsonData.Title);
                console.log("Year: " + jsonData.Year);
                console.log("IMDB Rating: " + jsonData.imdbRating);
                console.log("Country: " + jsonData.Country);
                console.log("Language: " + jsonData.Language);
                console.log("Plot: " + jsonData.Plot);
                console.log("Actors: " + jsonData.Actors);
                console.log("Rotten Tomato Rating: " + jsonData.Rating[1].Value);

            }
        });
    };
    
    // Variable for 'do-what-it-says' command, will use the fs package to call one of LIRI's commands
    // Should also log data to our random.txt file.
    var doWhatItSays = function() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            console.log(data);

            // Variable to split array in data sub strings
            var dataArray = data.split(",");
            
            // if statement that will pick the data array to be split
            if (dataArray.length === 2) {
                pick(dataArray[0], dataArray[1]);
              } else if (dataArray.length === 1) {
                  pick(dataArray[0]);
              }
        });
    };
            /** Make it so liri.js can take in the following commands
            * 
            *   'my-tweets'
            *   'spotify-this-song'
            *   'movie-this'
            *   'do-what-it-says'
            */

    // Variable for command with 2 param function with switch statement that will log results when any of 
    // the four commands are called.

    var nodeCommand = function(caseData, functionData) {
        switch (caseData) {
            case 'my-tweets':
            psuedoTweets();
            break;

            case 'spotify-this-song':
            mySpotify(functionData);
            break;

            case 'movie-this':
            movieSearch(functionData);
            break;

            case 'do-what-it-says':
            doWhatItSays();
            break;
            // When the command is called and undefined LIRI will log "Not a LIRI function!"
            default:
            console.log("Not a LIRI function!");
        }

    };

    //Variabel with a function with 2 params that will allow 2 call commands
    var returnData = function(arg1, arg2) {
        nodeCommand (arg1, arg2);
    };
    // Launches the command line argument to receive called data
    returnData(process.argv[2] + process.argv[3]);
    











