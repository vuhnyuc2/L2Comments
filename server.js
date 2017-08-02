var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');

global.rootDir = path.resolve(__dirname);
global.dbDir = path.resolve(__dirname + '/db');
global.modelDir = path.resolve(__dirname + "/app/models");
global.viewDir = path.resolve(__dirname + "/app/views");

app.use('/assets', require("./assets"));

app.use('/customer', require('./app/customer_controller'));

app.get('/get_customers', function(req,res,next){
  customer.get_all(function(customers){
    res.send(customers);
  });
});

app.get('/', function(req,res,next){
  res.sendFile(global.viewDir + '/index.html');
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
