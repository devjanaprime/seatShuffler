var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var index = require('./routes/index');



app.use(bodyParser.json());
app.use('/', index);

//app.get('/', function(req, res){
//    res.send("Hello!");
//});

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Listening on port ", port);
});

module.exports = app;
