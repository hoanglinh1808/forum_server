var con = require('../mysqldb.js');
var hpass = require('../hash_password.js')

function compareUserpassword(passwordInput, passworDB) {
  if (JSON.stringify(passwordInput) === JSON.stringify(passworDB)) {
    return true
  }
  else return false
}

exports.loginUser = function loginUser(user_phone, user_password, callback) {
  console.log(user_password)
  var user_Password = hpass.hashPassword(user_password);
  console.log(user_Password)
  var sql = "SELECT `forum_db`.`users`.`user_password` FROM `forum_db`.`users` " +
            "WHERE `forum_db`.`users`.`user_phone` = '" + user_phone + "'";
  con.query(sql, function (err, rows) {
    console.log(rows[0].user_password)
    var result = {};
    if (compareUserpassword(user_Password, rows[0].user_password) == true) {
      result = {'status' : 'done'}
      callback(null, result);
    }
    else {
      result = {'status' : 'fail'}
      callback(null, result);
    }
  });
}
