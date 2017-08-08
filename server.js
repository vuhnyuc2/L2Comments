var express = require('express');
var path = require('path');
var app = express();
var db = require('./db');

global.rootDir = path.resolve(__dirname);
global.dbDir = path.resolve(__dirname + '/db');
global.modelDir = path.resolve(__dirname + "/app/models");
global.viewDir = path.resolve(__dirname + "/app/views");

var customer = require(global.modelDir + '/customer');
var instance = require(global.modelDir + '/instance');

app.use('/assets', require("./assets"));

app.use('/customer', require('./app/customer_controller'));

app.post('/create_customer', function(req,res,next){
  customer.create(req.query.name, function(err, customers){
    if(!err){
        res.sendStatus(200);
    }
  });
});

app.get('/get_customers', function(req,res,next){
  customer.get_all(function(err, customers){
    res.send(customers);
  });
});

app.get('/get_instances', function(req,res,next){
  instance.get_by_customer(req.query.id, function(err, instances){
    console.log(instances[0].customer_id);
    res.send(instances);
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
