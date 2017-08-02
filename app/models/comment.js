var db = require('./db')

exports.create = function(instance_id, comment, done){
  var values = [instance_id, comment];
  db.get().query("INSERT INTO comments (instance_id, comment) VALUES (?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM comments WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_by_instance = function(customer_id, done){
  db.get().query("SELECT * FROM comments WHERE instance_id = ?", instance_id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
