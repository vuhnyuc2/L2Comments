var router = require('express').Router();
var Customer = require(global.modelDir + '/customer');
var Instance = require(global.modelDir + '/instance');
var Comments = require(global.modelDir + '/comment');
var Changes = require(global.modelDir + '/changes');
var Pmrs = require(global.modelDir + '/pmr');


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

// --------------------- single info/reload info --------------------------
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

router.get('/:instance_id/pmrs', function(req,res,next){
  instance_id = req.params.instance_id;
  Pmrs.get_by_instance(instance_id, function(err, suc){
    res.send(suc);
  });
});

// --------------------- batch info -------------------------
router.get('/:instance_id/info', function(req,res,next){
  console.log(req.params.instance_id);
  instance_id = req.params.instance_id;
  console.log(instance_id);
  Changes.get_by_instance(instance_id, function(err, changes){
    Comments.get_by_instance(instance_id, function(err, comments){
      Pmrs.get_by_instance(instance_id, function(err, pmrs){
        data = {
          'changes' : changes,
          'comments' : comments,
          'pmrs' : pmrs
        };
        res.send(data);
      });
    });
  });
});

// --------------------- Post info --------------------------
router.post('/:instance_id/edit', function(req,res,next){
  edit = req.body;
  instance_id = req.params.instance_id;
  Instance.edit_field(instance_id, edit['field'], edit['value'], function(err, suc){
    if(err){
      res.sendStatus(400);
    }else{
      res.sendStatus(200);
    }
  });
});

router.post('/:instance_id/comment', function(req,res,next){
  instance_id = req.params.instance_id;
  name =  req['body']['name'];
  comment = req['body']['comment'];
  pmr = null;
  if(req['body']['pmr']){
    pmr = req['body']['pmr'];
  }
  Comment.create(instance_id,comment,name,pmr,function(err,suc){
    if(suc){
      res.sendStatus(200);
    }
  });
});

router.post('/:instance_id/pmr', function(req,res,next){
  instance_id = req.params.instance_id;
  pmr_number = req['body']['pmr_number'];
  description = req['body']['description'];
  var pmr_pat = new RegExp("^[0-9]{5},[0-9]{3},[0-9]{3}$");
  if(!pmr_pat.test(pmr_number.toString())){
    res.sendStatus(400);
  }
  Pmrs.get_by_instance(pmr_number, instance_id, description, function(err, suc){
    res.sendStatus(200);
  });
});

module.exports = router;
