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
	arguments[1].redirect("/Angularui.html");
});
app.get("/EmployeeDet",function(){
	arguments[1].redirect("/EmployeeDetails.html");
});
app.post("/saveEmployee",function(res,resp){
	console.log("Response from Request: "+res.body.params);
	//empHash.saveEmp(req.emp);
    arguments[1].send("This request resonpse: "+Object.keys(arguments[0]));
});



var con = mysql.createConnection({
    host     : '0.0.0.0',
	port : 3306,
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
app.get('/delete/:id' , function(req,res)
{
                con.query('DELETE FROM employee where empId = '+ req.params.id , function(err, rows)
                {
                                if(err)
                                {
                                                console.log(err)
                                }
                                res.send(JSON.stringify(rows));
                                res.end();
                });
});
});

//INSERTING A CUSTOMER

app.post('/insert' , function(req,res) 
{
                var customer = 
                {
                                                cusName : req.body.name,
                                                address : req.body.address,
                                                email : req.body.email,
                                                phone : req.body.phone
                };
                //console.log(customer);
                con.query('insert into employee set ?', customer ,  function(err , rows )
                {
                                if(err)
                                {
                                                console.log(err)
                                }
                                res.send(rows);
                                res.end(JSON.stringify(rows));
});
});

//UPDATING A CUSTOMER

app.put('/update/:name' , function(req , res)
{
                name = req.params.name;
                phone = req.body.phone;
                address = req.body.address;
                email = req.body.email;
                console.log(customer);
                con.query('UPDATE employee set phone = ?,address=?,email=? where name = ? ' , [phone,address,email,name], function(err,rows)
                {
                if(err)
                                {
                                                console.log(err)
                                }
                                res.send(rows);
                                res.end(JSON.stringify(rows));
});
});
app.set('port', process.env.PORT || 3030);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
module.exports = app;