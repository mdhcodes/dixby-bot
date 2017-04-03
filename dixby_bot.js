// Dixby_Bot node.js

/*

Using the fs Node package, DIXBY will take the text inside of random.txt and then use it to call one of DIXBY's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.


BONUS

In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
Make sure you append each command you run to the log.txt file.
Do not overwrite your file each time you run a command.

*/


// Get the data from keys.js and store the data in a variable named keys.
var keys = require('./keys.js');
// Ensure the node npm request package is included to run this application.
var request = require('request');
// Store user input with global variables.
var processArgv = process.argv.slice(2);
//console.log('processArgv', processArgv);
var action = processArgv[0];
//console.log('Action: ' + action);
var input = processArgv.shift();
input = processArgv.join(' ');
console.log('Input: ' + input);


// Function to get information about my last 20 tweets.
var getTweets = function(action) { // Add action parameter for do-what-it-says command.
  // Ensure the node npm twitter package is included to run this application.
  var Twitter = require('twitter');
  // Supply the developer keys to authorize usage of the twitter api / node npm package.
  var client = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
  });

  // Store the twitter screen_name to query in a variable named params.
  var params = { screen_name: 'mdhCodes' };
  // Execute the GET request to access data from the twitter api.
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
          // Display my last 20 tweets and when they were created.
          for (var i = 0; i < 20; i++) {
              console.log('----------- Tweet', [i + 1], '------------');
              console.log('Tweet Text:', tweets[i].text);
              console.log('Tweet Date/Time:', tweets[i].created_at);
              console.log('-------------------------------------' + '\n');
          }
      } else { // end successful response - if (!error)
          console.log('Error occurred:', error);
      } // end error response
  }); // end client.get()
}; // end getTweets()



// Function to get information about a specific song.
var getSong = function(action, input) { // Add action and input parameters for do-what-it-says command.
  // If the user doesn't provide song input, they'll see information about 'The Sign' by Ace of Base.
  if(input === '') {
    input = 'The Sign';
    // Ensure the node npm spotify package is included to run this application.
    var spotify = require('spotify');
    // Execute the search method to access data from the spotify api.
    spotify.search({ type: 'track', query: input }, function(error, data) {
      if (error) {
          console.log('Error occurred: ' + error);
          return;
      } // end error response
      // Display the song data.
      console.log('Artist:', data.tracks.items[2].album.artists[0].name);
      console.log('Song Name:', data.tracks.items[2].name);
      console.log('Preview Link:', data.tracks.items[2].preview_url);
      console.log('Album Name:', data.tracks.items[2].album.name);
    });
  } else { // end condition for no song input
    // Ensure the node npm spotify package is included to run this application.
    var spotify = require('spotify');
    // Execute the search method to access data from the spotify api.
    spotify.search({ type: 'track', query: input }, function(error, data) {
        if (error) {
            console.log('Error occurred: ' + error);
            return;
        } // end error response
        //console.log(data.tracks.items[0]);
        for(var i = 0; i < data.tracks.items.length; i++) {
          for(var j = 0; j < data.tracks.items[i].album.artists.length; j++) {
          //console.log(data.tracks.items[i]);
          // Display the song data.
          console.log('--------------- Song ' + [i + 1] + ' ------------------');
          console.log('Artist:', data.tracks.items[i].album.artists[j].name);
          console.log('Song Name:', data.tracks.items[i].name);
          console.log('Preview Link:', data.tracks.items[i].preview_url);
          console.log('Album Name:', data.tracks.items[i].album.name);
          console.log('------------------------------------------' + '\n');
          }
        } // end successful response
    }); // end spotify.search()
  } // end successful response with song input
}; // end getSong()



// Function to get information about a specific movie.
var getMovie = function(action, input) { // Add action and input parameters for do-what-it-says command.
  // If the user doesn't provide movie input, they'll see information about 'Mr. Nobody.'
	if(input === '') {
		input = 'Mr. Nobody';
	} // end condition for no movie input
  // queryUrl to be used to access data from the OMDB api.
	var queryUrl = 'http://www.omdbapi.com/?t=' + input + '&tomatoes=true';
  // Execute request to access data from the OMDB api.
	request(queryUrl, function (error, response, body) {
    // Print the error if one occurred
		console.log('error:', error);
    // Print the response status code if a response was received
		console.log('statusCode:', response && response.statusCode);
    // Print the complete response.
		//console.log('body:', body);
    // JSON.parse() takes a string and converts it to a javaScript object.
		var data = JSON.parse(body);
		//console.log(data);
    // Display the movie data.
		console.log('Movie Title:', data.Title);
		console.log('Movie Year:', data.Year);
		console.log(data.Ratings[0].Source + ' Rating: ' + data.Ratings[0].Value);
		console.log('Country Produced:', data.Country);
		console.log('Movie Language:', data.Language);
		console.log('Movie Plot:', data.Plot);
		console.log('Movie Actors:', data.Actors);
		console.log(data.Ratings[1].Source + ' Rating: ' + data.Ratings[1].Value);
		console.log('Rotten Tomatoes URL:', data.tomatoURL);
	}); // end successful response with movie input
}; // end getMovie()



// Execute functions corresponding to the action specified.
switch (action) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        getSong();
        break;
    case 'movie-this':
        getMovie();
        break;
    case 'do-what-it-says':
        // Ensure the node file system package is included to run this application.
        var fs = require('fs');
        // Execute the readFile method passing it the path to the file, an option specifying the encoding, and the callback function.
        fs.readFile('./random.txt', 'utf-8', function(error, data) {
            if (error) {
              // Print the error if one occurred.
              console.log('Error occurred: ' + error);
            }
            //console.log(data);
            // Convert a string object into an array of strings.
            var dataArray = data.split(',');
            //console.log('dataArray', dataArray);
            // The first element in the array is stored in the action variable.
            action = dataArray[0];
            //console.log('DWIS Action:', action);
            // The second element in the array is stored in the input variable.
            input = dataArray[1];
            //console.log('DWIS Input:', input);
            if (action === 'my-tweets') {
                getTweets(action);
            }
            if (action === 'spotify-this-song') {
                getSong(action, input);
            }
            if (action === 'movie-this') {
                getMovie(action, input);
            }
        });
        break;
    default:
        console.log('Please select a valid action!');
}
