var router = require('express').Router();
var Customer = require(global.modelDir + '/customer');
var Instance = require(global.modelDir + '/instance');
var Comments = require(global.modelDir + '/comment');
var Changes = require(global.modelDir + '/changes')


router.get('/:id', function(req,res,next){
  res.sendFile(global.viewDir + '/customer.html');
});

router.get('/get/:id', function(req,res,next){
  Customer.get(req.params.id, function(err, customer){
    console.log(customer);
    Instance.get_by_customer(customer[0].id, function(err, instances){
      data = {
        'customer' : customer,
        'instances' : instances
      };
      res.send(data);
    });
  });
});

router.get('/:instance_id/changes', function(req,res,next){
  instance_id = req.params.instance_id;
  Changes.get_by_instance(instance_id, function(err, suc){
    res.send(suc);
  });
});

router.get('/:instance_id/comments', function(req,res,next){
  instance_id = req.params.instance_id;
  Comments.get_by_instance(instance_id, function(err, suc){
    res.send(suc);
  });
});

router.get('/:instance_id/info', function(req,res,next){
  instance_id = req.params.instance_id;
  Changes.get_by_instance(instance_id, function(err, changes){
    Comments.get_by_instance(instance_id, function(err, comments){
      data = {
        'changes' : changes,
        'comments' : comments
      };
      res.send(data);
    });
  });
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
  Comment.create(instance_id,comment,name,pmr,function(err,suc){
    if(suc){
      res.status(200).send('success');
    }
  });
});

module.exports = router;
