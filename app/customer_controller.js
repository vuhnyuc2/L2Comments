var router = require('express').Router();
var Customer = require(global.modelDir + '/customer.js');


router.get('/', function(req,res,next){
  res.sendFile(global.viewDir + '/customer.html');
});

router.get('/:id', function(req,res,next){
  Customer.get(req.params.id, function(customer){
    res.send(customer);
  });
});

module.exports = router;
