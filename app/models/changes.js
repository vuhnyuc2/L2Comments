var db = require('./db')

exports.create = function(customer, field, new_info, date, done){
  var values = [comment, post_id, user_id];
  db.get().query("INSERT INTO customer (customer, field, new_info, date) VALUES (?, ?, ?, ?)", values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM customers WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_by_customer = function(company, done){
  db.get().query("SELECT * FROM customers WHERE name", company function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}