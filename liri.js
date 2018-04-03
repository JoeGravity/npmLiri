require("dotenv").config();

var fs = require('fs');

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);


var userCommand = process.argv[2];
var randomSearch;

var client = new Twitter(keys.twitter);


// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });

switch (userCommand) {
  case "my-tweets":
    twitterCommand();
    break;
  case "spotify-this-song":
    spotifyCommand();
    break;
  case "movie-this":
    movieCommand();
    break;
  case "do-what-it-says":
    randomText();
    break;
  default:
    console.log('Whatcha want me to do?');
};

function twitterCommand() {
  // var params = {screen_name: 'nodejs'};

  // var params = {
  //   screen_name: 'Joe Pfahl',
  //   count: 20,
  //   result_type: 'recent',
  //   lang: 'en'
  // }

  var params = { screen_name: 'Joe Pfahl' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {


    if (!error) {
      for (i = 0; i < 20 && i < tweets.length; i++) {
        console.log("-----------------------------------------------" +
          "\nTweet #" + (i + 1) +
          "\nTweeted at: " + tweets[i].created_at +
          "\n" + tweets[i].text);

      };
    }
  });
};
// SPOTIFY ----------------------------------------------------------------------------
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from

function spotifyCommand() {
  var trackName;
  // If no song is provided, default to "The Sign" by Ace of Base.
  if (process.argv[3] == undefined && randomSearch == undefined) {
      trackName = '"The Sign" by Ace of Base'
  } else if (randomSearch !== undefined) {
      trackName = randomSearch
  } else {
      trackName = process.argv[3];
  };

  var params = { type: 'track', query: trackName }
  spotify.search(params, function (err, data) {
      if (err) {
          return console.log("Error: " + err);
      }
      console.log("------------------------------------\nSPOTIFY TRACKS: " +
          "\nArtist........ " + data.tracks.items[0].artists[0].name +
          "\nSong Name..... " + data.tracks.items[0].name +
          "\nPreview Link.. " + data.tracks.items[0].href +
          "\nAlbum......... " + data.tracks.items[0].album.name +
          "\n-----------------------------------------");

  });
};
// OMDB --------------------------------------------------------------------------------
// 3. `node liri.js movie-this '<movie name here>'`
//    * This will output the following information to your terminal/bash window:

//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.' <http://www.imdb.com/title/tt0485947/>
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

function movieCommand() {
  if (process.argv[3] == undefined && randomSearch == undefined) {
      title = "Mr. Nobody"
  } else if (randomSearch !== undefined) {
      title = randomSearch
  } else {
      title = process.argv[3];
  };
  // Request info from omdb api
  request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
      if (!error && response.statusCode === 200) {
          console.log("------------------------------------\nOMDB MOVIE INFO: " +
              "\nTitle................... " + JSON.parse(body).Title +
              "\nDate of release......... " + JSON.parse(body).Released +
              "\nIMDB Rating............. " + JSON.parse(body).imdbRating +
              "\nRotten Tomatoes Rating.. " + JSON.parse(body).Ratings[1].Value +
              "\nCountry where produced.. " + JSON.parse(body).Country +
              "\nLanguage................ " + JSON.parse(body).Language +
              "\nPlot.................... " + JSON.parse(body).Plot +
              "\nActors.................. " + JSON.parse(body).Actors +
              "\n-----------------------------------------");
      };
  });
};