require("dotenv").config();

var fs = require('fs');

// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");
var keys = require('./keys.js');

var Twitter = require('twitter');


var Spotify = require("node-spotify-api")

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

