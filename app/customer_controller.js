var router = require('express').Router();
var Customer = require(global.modelDir + '/customer');
var Instance = require(globla.modelDir + '/instance');


router.get('/', function(req,res,next){
  res.sendFile(global.viewDir + '/customer.html');
});

router.get('/:id', function(req,res,next){
  Customer.get(req.params.id, function(customer){
    Instance.get_by_customer(customer.id, function(instances){
      data = {
        'customer' : customer,
        'instances' : instances
      };
      res.send(data);
    });
  });
});

router.post('/:instance_id/edit', function(req,res,next){
  edits = req['body']['edits'];
  edits.foreach(function(val){
    
  });
});

module.exports = router;
