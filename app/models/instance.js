var db = require('./db')

exports.create = function(customer_id, name, bpm, was, jdk, process_center,
  process_server, os, bpm_application, db_type, db_version, done){
  var values = [customer_id, name, bpm, was, jdk, process_center, process_server,
                os, bpm_application, db_type, db_version, done];
  query = "INSERT INTO instances (customer_id, name, bpm, was, jdk, process_center," +
          " process_server, os, bpm_application, db_type, db_version, done) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.get().query(, values, function(err, result){
    if (err) return done(err);
    done(null, result.insertId);
  });
}

exports.get = function(id, done){
  db.get().query("SELECT * FROM instances WHERE id = ?", id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.edit_field = function(id, field, value, done){
  values = [value,id];
  db.get().query("INSERT INTO instances (" +  field + ") VALUES (?) WHERE id = ?", values function(err,result){
    if (err) return done(err);
    done(null, result);
  });
}

exports.get_by_customer = function(customer_id, done){
  db.get().query("SELECT * FROM instances WHERE customer_id", customer_id function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
