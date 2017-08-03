var db = require(global.dbDir);

exports.create = function(instance_id, field, new_info, done){
  var values = [instance_id, field, new_info];
  db.get().query("INSERT INTO changes (instance_id, field, new_info) VALUES (?, ?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM changes WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_by_instance = function(instance_id, done){
  db.get().query("SELECT * FROM changes WHERE instance_id = ?", instance_id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
