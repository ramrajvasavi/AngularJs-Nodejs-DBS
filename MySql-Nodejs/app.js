var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var mysql = require('mysql');
var customer =[];

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
	arguments[1].redirect("/index.html");
});
app.post("/saveEmployee",function(res,resp){
	console.log("Response from Request: "+arguments[0].body.empFName);
	//empHash.saveEmp(req.emp);
    //arguments[1].send("This request resonpse: "+Object.keys(arguments[0].body));
	var customer = 
                {
					empId:105,
					empFName : res.body.empFName,
					empLName : res.body.empLName,
					designation : res.body.designation,
					locationName : res.body.locationName,
					qualification : res.body.qualification,
					percentage : res.body.percentage
                };
                //console.log(customer);
                con.query('insert into employee set ?', customer ,  function(err , rows )
                {
					if(err){
						console.log(err)
					}
					resp.send(rows);
					resp.end(JSON.stringify(rows));
				});
});



var con = mysql.createConnection({
    host     : '127.0.0.1',
	port : 3307,
    user     : 'root',
    password : 'root',
    database    : 'customerdetails'
});

//CONNECTION ESTABLISHED TO MYSQL

con.connect(function(err)
{
                if(err)
                {
                                return console.log('Connection failed: '+err);
                }
                else
                {
                                console.log('Connection established');
                }


// RETRIEVING ALL THE CUSTOMERS 
app.get('/Employee' , function(req,res)
{
con.query('SELECT * from employee', function(err,rows)
{
                if(err)
                {
                                console.log(err);
                }
                res.send(JSON.stringify(rows));  
});
});

// RETRIEVING A SPECIFIC CUSTOMER 
app.get('/Employee/:id' , function(req,res)
{
                //var id = req.params.id;
				console.log("Req Id: "+req.params.id);
                con.query('SELECT * from employee where empId = "'+req.params.id +'"', function(err,rows)
                {
                if(err)
                {
                                console.log(err)
                }
                res.send(JSON.stringify(rows));
                res.end();

});
});
                
//DELETING A CUSTOMER                 
app.post('/delete' , function(req,res)
{
                con.query('DELETE FROM employee where empId = '+ req.body.empId , function(err, rows){
					if(err)
					{
						console.log(err);
					}
					res.send(JSON.stringify(rows));
					res.end();
                });
});
});



//UPDATING A CUSTOMER

app.post('/update' , function(req , res)
{
                empId = req.body.empId;
					empFName = req.body.empFName;
					empLName = req.body.empLName;
					designation = req.body.designation;
					locationName = req.body.locationName;
					qualification = req.body.qualification;
					percentage = req.body.percentage;
                con.query('UPDATE employee set empFName = ?,empLName=?,designation=?,locationName=?,qualification=?,percentage=? where empId = ? ' , [empFName,empLName,designation,locationName,qualification,percentage,empId], function(err,rows)
                {
                if(err){
                    console.log(err)
                }
				res.send(rows);
				res.end(JSON.stringify(rows));
});
});
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

/**
create database customerdetails;

use customerdetails;
show tables;

create table employee(empId int(5),empFName varchar(30),
empLName varchar(30),designation varchar(30),
locationName varchar(30),qualification varchar(30),percentage varchar(10));

select * from employee;

insert into employee values(101,'rajesh','Gadhamsetty','Software Engineering','Bang','MCA','80%');
insert into employee values(102,'Stev','Gadhamsetty','Software Engineering','Bang','MCA','80%');
insert into employee values(103,'Jobs','Stev','Senior Software Engineering','Chennai','MCA','72%');
 */
module.exports = app;