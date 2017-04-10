var app = (function () {
	var client = require("./keys.js"),
		response = require("request-promise"),
		fs = require("fs");

	var tweet = function () {
		var params = {
			screen_name: 'Keythe Gentry',
			count: 20
		}

		client.key.get('statuses/user_timeline', params, function(error, tweets, response){
			for (var i = 0; i < tweets.length; i++){
				console.log((i+1) + "-" + tweets[i].text.replace('@_', ' '));
				console.log("________________________________________");
				console.log("________________________________________");
			}
		});
	}
	/*
	var spotify = function () {

	}
	*/
	var movie = function (name) {
		// console.log("name: " + name);
		var promise = response("http://www.omdbapi.com/?t=" + name + "&type=movie");

		promise.then(function(data){
			var obj = JSON.parse(data);
			// console.log(data);
			// console.log(obj);
			console.log("Title: " + obj.Title);
			console.log("Year: " + obj.Year);
			console.log("Rated: " + obj.Rated);
			console.log("Country: " + obj.Country);
			console.log("Language: " + obj.Language);
			console.log("Plot: " + obj.Plot);
			console.log("Actors: " + obj.Actors);
			console.log("Rating: " + obj.Ratings.Value);
		})
		.catch(function(err){
			console.log(err.message);
		});
	}

	return{
		tweet: tweet,
		movie: movie
	}
})();

switch(process.argv[2]){
	case 'my-tweets':
		app.tweet();
		break;
	case 'movie-this':
		app.movie(process.argv[3]);
		break;
	default:
		console.log("No tweets found!!");
}