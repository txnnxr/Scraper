var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('/views'));
require('./router/main')(app);
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server     =    app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



/*
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
*/