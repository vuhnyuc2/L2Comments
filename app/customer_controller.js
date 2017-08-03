var router = require('express').Router();
var Customer = require(global.modelDir + '/customer');
var Instance = require(global.modelDir + '/instance');
var Comment = require(glboal.modelDir + '/comment');
var Changes = require(global.modelDir + )


router.get('/', function(req,res,next){
  res.sendFile(global.viewDir + '/customer.html');
});

router.get('/:id', function(req,res,next){
  Customer.get(req.params.id, function(customer){
    Instance.get_by_customer(customer.id, function(err, instances){
      data = {
        'customer' : customer,
        'instances' : instances
      };
      res.send(data);
    });
  });
});

router.get('/:instance_id/changes', function(req,res,next){

});

router.post('/:instance_id/edit', function(req,res,next){
  edits = req['body']['edits'];
  id = req.params.instance_id;
  failed = [];
  for(var i = 0; i < edits.length; i++){
    Instance.edit_field(id, edits[i]['field'], edits[i]['value'], function(err, suc){
      if(err){
        failed.push({
          'field': edits[i]['field'],
          'value': edits[i]['value']
        });
      }
      if(i == edits.length){
        res.send(failed);
      }
    });
  }
});

router.post('/:instance_id/comment', function(req,res,next){
  instance_id = req.params.instance_id;
  comment = req['body']['comment'];
  Comment.create(id,comment,function(err,suc){
    if(suc){
      res.status(200).send('success');
    }
  });
});

module.exports = router;
