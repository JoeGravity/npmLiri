require("dotenv").config();

var Twitter = require('twitter');

var client = require('./keys.exports.twitter');

 
// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

/*  
client.get('favorites/list', function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites. 
    console.log(response);  // Raw response object. 
  });

  var twit = new twitter(params);
  twit.get('http://api.twitter.com/1.1/statuses/user_timeline.json?count=2',{include_entities:false},);

  twit.get('/statuses/user_timeline.json', { count: 1 }, func);

 */

/* 
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
var request = require("request");

// Then run a request to the Twitter API for last 20 tweets
request("https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
 */

