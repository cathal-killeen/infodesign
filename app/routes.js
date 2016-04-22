var results = require('./data/results.json')
var entrants = require('./data/entrants.json')

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	})

	app.get('/results', function(req, res){
		console.log(results);
		return res.status(200).json(results).send();
	})

	app.get('/entrants', function(req, res){
		console.log(entrants);
		return res.status(200).json(entrants).send();
	})

};
