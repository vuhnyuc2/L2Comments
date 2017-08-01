var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');

app.get('/', function(req,res,next){
  res.sendFile('index.html');
});

app.get('/customer/:id', function(req,res,next){
  res.sendFile('customer.html');
});

db.connect(function(err) {
  if (err) {
    console.log('Unable to connect to MySQL.');
    process.exit(1);
  } else {
    app.listen(3300, function() {
      console.log('Listening on port 3300...');
    });
  }
});

var server = app.listen(process.env.PORT || 8000, function () {});
