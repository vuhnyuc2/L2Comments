var db = require(global.dbDir);

exports.create = function(customer_id, name, bpm, was, jdk, process_center,
  process_server, os, bpm_application, db_type, db_version, done){
  var values = [customer_id, name, bpm, was, jdk, process_center, process_server,
                os, bpm_application, db_type, db_version, done];
  query_string = "INSERT INTO customer (customer_id, name, bpm, was, jdk, process_center," +
          " process_server, os, bpm_application, db_type, db_version, done) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.get().query(query_string, values, function(err, result){
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
  db.get().query("UPDATE instances SET "+field+"= ? WHERE id = ?", values, function(err, result){
    if (err) return done(err);
    changes.create(id, field, value, function(err, suc){
      if (err) return done(err);
      done(null, suc);
    });
  });
}

exports.get_by_customer = function(customer_id, done){
  db.get().query("SELECT * FROM instances WHERE customer_id = ?", customer_id, function(err, result){
    if (err) return done(err);
    done(null, result);
  });
}
