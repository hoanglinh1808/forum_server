var con = require('../mysqldb.js');

exports.checkPhone = function checkPhone(user_phone, callback) {
  var sql = "SELECT count(*) as check_phone FROM `forum_db`.`users` " +
            "WHERE `forum_db`.`users`.`user_phone` = '" + user_phone + "'";
  con.query(sql, function (err, rows) {
    if (rows[0].check_phone == 1) {
      var result = { 'status' : 'true' }
      callback(null, result)
    }
    else {
      var result = { 'status' : 'false' }
      callback(null, result)
    }
  });
}