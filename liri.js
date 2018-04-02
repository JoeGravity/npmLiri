require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require ("node-spotify-api")
var client = require('./keys.js');




// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// Then run a request to the Twitter API for last 20 tweets

// Set up your search parameters
var params = {
  // screen_name: 'GopherFootball',
  // q: 'mg_bootcamp',
  screen_name: 'Joe Pfahl',
  count: 20,
  result_type: 'recent',
  lang: 'en'
}
 
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
 
// var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);


    // console.log("The movie's rating is: " + JSON.parse(body)tweets.text);

  }
});


/* 
for(int i = 0; i < tweets.statuses.count; i++){
  var tweet = [];
  tweet[i+1] = {
     id:tweets.statuses[i].id, 
     text:tweets.statuses[i].text,
     created_at:tweets.statuses[i].created_at,
     //etc
  };
  tweetsArray[i] = tweet[i+1];
};
 */


 /* request("https://api.twitter.com/1.1/search/tweets.json?q=%20twitterapi", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).created_at,text);
  }
});
 */

