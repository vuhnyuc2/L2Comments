var db = require(global.dbDir);

exports.create = function(name, done){
  db.get().query("INSERT INTO customers (name) VALUES (?)", name, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get_all = function(done){
  db.get().query("SELECT name FROM customers", function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM customers WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_by_name = function(name, done){
  db.get().query("SELECT * FROM customers WHERE name = ?", name, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
