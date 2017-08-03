var router = require('express').Router();

router.get('/angular.js', function(req,res,next){
  res.sendFile(global.rootDir + "/node_modules/angular/angular.min.js");
});

router.get("/bootstrap.min.css", function(req,res,next){
  res.sendFile(global.rootDir + "/node_modules/bootstrap/dist/css/bootstrap.min.css");
})

router.get("/homeCtlr.js", function(req,res,next){
  res.sendFile(global.viewDir + "/homeCtlr.js");
});

router.get("/customerCtlr.js", function(req,res,next){
  res.sendFile(global.viewDir + "/customerCtlr.js");
});

router.get("/custom.css", function(req,res,next){
  res.sendFile(global.viewDir + "/custom.css");
});

router.get("/neat.svg", function(req,res,next){
  res.sendFile(global.viewDir + "/neat.svg");
});

module.exports = router;
