require("dotenv").config();

var fs = require('fs');

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require("node-spotify-api")
var spotify = new Spotify(keys.spotify);


var inputReq = process.argv[2];
var randomText;

var client = new Twitter(keys.twitter);


switch (inputReq) {
  case "my-tweets":
    twitterReq();
    break;
  case "spotify-this-song":
    spotifyReq();
    break;
  case "movie-this":
    omdbReq();
    break;
  case "do-what-it-says":
    randomReq();
    break;
  default:
    console.log('Whatcha want me to do?');
};

// TWITTER -------------------------------------------------------------------
// 1. `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.


function twitterReq() {

  var params = { screen_name: 'Joe Pfahl' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {


    if (!error) {
      for (i = 0; i < 20 && i < tweets.length; i++) {
        console.log("-----------------------------------------" +
          "\nTime/Date sent: " + tweets[i].created_at +
          "\nMessage: " + tweets[i].text);
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

function spotifyReq() {
  var trackName;
  // If no song is provided, default to "The Sign" by Ace of Base.
  if (process.argv[3] == undefined && randomText == undefined) {
    trackName = '"The Sign" by Ace of Base'
  } else if (randomText !== undefined) {
    trackName = randomText
  } else {
    trackName = process.argv[3];
  };

  var params = { type: 'track', query: trackName }
  spotify.search(params, function (err, data) {
    if (err) {
      return console.log("Error: " + err);
    }
    console.log("-----------------------------------------\nSPOTIFY TRACKS: " +
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

function omdbReq() {
  if (process.argv[3] == undefined && randomText == undefined) {
    title = "Mr. Nobody"
  } else if (randomText !== undefined) {
    title = randomText
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

// 4. `node liri.js do-what-it-says` --------------------------------------------------------------------------------
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands. 

// function randomReq() {
//   fs.readFile('random.txt', 'utf-8', function eval(err, data) {
//     var dataArray = data.split(",");
//     randomSearch = dataArray[1];

//     switch (dataArray[0]) {
//       case "my-tweets":
//         twitterReq();
//         break;
//       case "spotify-this-song":
//         spotifyReq();
//         break;
//       case "movie-this":
//         omdbReq();
//         break;
//       case "do-what-it-says":
//         // log();
//         break;
//     };
//   });
// };


function randomReq() {
  fs.readFile('random.txt', 'utf-8', function eval(err, data) {
    var dataArray = data.split(",");
    randomText = dataArray[1];

    switch (dataArray[0]) {
      case "my-tweets":
        twitterReq();
        break;
      case "spotify-this-song":
        spotifyReq();
        break;
      case "movie-this":
        omdbReq();
        break;
      case "do-what-it-says":
        // log();
        break;
    };
  });
};

