var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "b87227934b8a56",
    password: "abfb9e2c",
    database: "heroku_2d84f59619909f8"
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/times', function(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
});

app.get('/db', function(req, res){
    connection.query("SELECT * FROM test_table", function(err, result, fields){
        if(err){
            console.log("ERROR : " , err);
            throw err;
        }
        res.send(["hello clearDB", result]);
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


