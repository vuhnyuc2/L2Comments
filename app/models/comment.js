var db = require(global.dbDir);

exports.create = function(instance_id, name, comment, pmr){
  var values = [instance_id, name, comment, pmr];
  db.get().query("INSERT INTO comments (instance_id, name, comment, pmr) VALUES (?, ?, ?, ?)", values, function(err, result){
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

exports.get_by_instance = function(instance_id, done){
  db.get().query("SELECT * FROM comments WHERE instance_id = ?", instance_id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
