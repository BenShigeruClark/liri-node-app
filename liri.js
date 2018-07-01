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
            // if there are no errors run for loop with tweet data up to 25
                for (var i = 0; i < tweets.length; i++) {
                    var feed = tweets[i].created_at;
                    console.log("@MorphaNode: " + tweets[i].text + feed.substring(0,24));
                    console.log("");
                    console.log(tweets[i].text);

                }
            }
        });
    };

    var mySpotify = function(songTitle){
        if (songTitle === undefined) {
            songTitle = "Dark Steering";
        }
        spotify.search( 
            { 
                type: "track",
                query: songTitle
            },
            function(err, data) {
                if (err) {
                    console.log("Error occured: " + err);
                    return;
                }
            }
        )
    };

    var runThis = function(arg1, arg2) {
        pick (arg1, arg2);
    };

    runThis(process.argv[2] + process.argv[3]);
    









// Get information from spotify API about the song input from terminal
// Arists, The Song's Name, A preview link of  the song from Spotify, and 
// The album that the song is from.


// Get data that will output movie data from omdb API
/** Should log 
 * Title of moive 
 * Year it came out.
 * IMDB rating of movie.
 * Country where the movie was produced
 * Language of movie.
 * Plot
 * Actors
 */

/** Make it so liri.js can take in the following commands
 * 
 *   'my-tweets'
 *   'spotify-this-song'
 *   'movie-this'
 *   'do-what-it-says'
 */