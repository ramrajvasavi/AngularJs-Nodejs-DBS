var express = require('express');
var home = express.Router();

/* GET home page. */

home.get('/', function(req, res) {
	console.log("home is called"+ __dirname);
	res.setHeader('Content-Type', 'application/json');
  res.write("Welcome to APP PES Product API");
});

module.exports = home;