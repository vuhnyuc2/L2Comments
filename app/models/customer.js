var db = require(global.dbDir);

exports.create = function(comment, post_id, user_id, done){
  var values = [comment, post_id, user_id];
  db.get().query("INSERT INTO customers (id, company) VALUES (?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get_all = function(done){
  db.get().query("SELECT company FROM customers", function(err, result){
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

exports.get_by_name = function(company, done){
  db.get().query("SELECT * FROM customers WHERE name = ?", company, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}