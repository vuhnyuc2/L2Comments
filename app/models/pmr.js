var db = require(global.dbDir);

exports.create = function(pmr_number, instance_id, description, done){
  var values = [pmr_number, instance_id, description];
  db.get().query("INSERT INTO pmrs (pmr_number, instance_id, description) VALUES (?, ?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM pmrs WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_by_instance = function(instance_id, done){
  db.get().query("SELECT * FROM pmrs WHERE instance_id = ?", instance_id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
