var db = require('./db')

exports.create = function(comment, post_id, user_id, done){
  var values = [comment, post_id, user_id];
  db.get().query("INSERT INTO comments (id, customer_id, user_email) VALUES (?, ?, ?, ?)", values, function(err, result){
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

exports.get_by_customer = function(customer_id, done){
  db.get().query("SELECT * FROM comments WHERE customer_id = ?", customer_id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
