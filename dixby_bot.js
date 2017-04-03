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
var request = require('request');
var processArgv = process.argv.slice(2);
//console.log('processArgv', processArgv);
var action = processArgv[0];
//console.log('Action: ' + action);

// Function to get information about my last 20 tweets.
var getTweets = function() {
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
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // Display my last 20 tweets and when they were created.
            for (var i = 0; i < 20; i++) {
                console.log('----------- Tweet', [i + 1], '------------');
                console.log('Tweet Text:', tweets[i].text);
                console.log('Tweet Date/Time:', tweets[i].created_at);
                console.log('-------------------------------------' + '\n');
            }
        } else {
            console.log('Error occurred:', error);
        }
    });
};




switch (action) {
    case 'my-tweets':
        getTweets();
        break;
    default:
        console.log('Please select another action!');
}
