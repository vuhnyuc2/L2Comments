var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');

global.rootDir = path.resolve(__dirname);
global.dbDir = path.resolve(__dirname + '/db');
global.modelDir = path.resolve(__dirname + "/app/models");
global.viewDir = path.resolve(__dirname + "/app/views");

var customer = require(global.modelDir + '/customer.js');

app.use('/assets', require("./assets"));

app.get('/', function(req,res,next){
  res.sendFile(global.viewDir + '/index.html');
});

app.get('/customer', function(req,res,next){
  res.sendFile(global.viewDir + '/customer.html');
});

app.get('get_customer/:id', function(req,res,next){
  customer.get(req.params.id, function(customer){
    res.send(customer);
  });
});

app.get('/get_customers', function(req,res,next){
  customer.get_all(function(customers){
    res.send(customers);
  });
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
