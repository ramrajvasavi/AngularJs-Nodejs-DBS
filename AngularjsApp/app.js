var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var empHash = require('./public/js/employeeHash.js');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';
app.use(express["static"](__dirname + '/public'));

function sendResponse(){
	arguments[0].contentType("text/html");
	arguments[0].send(arguments[1]);
}
function parsedHtml(){
	arguments[0]=__dirname+"/../views"+arguments[0];
	var fileContent = fs.readFileSync(arguments[0], 'utf8');
	var dynamicHtml = ejs.render(fileContent, {"request": arguments[1],"response":arguments[2]});
	return dynamicHtml;
}
app.get("/",function(){
	arguments[1].redirect("/Angularui.html");
});
app.post("/saveEmployee",function(){
	console.log("Response from Request: "+arguments[0]);
	//empHash.saveEmp(req.emp);
    arguments[1].send("This request resonpse: "+Object.keys(arguments[0]));
});
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;