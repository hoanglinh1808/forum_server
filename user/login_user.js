var con = require('../mysqldb.js');
var hpass = require('../hash_password.js')

function compareUserpassword(passwordInput, passworDB) {
  if (JSON.stringify(passwordInput) === JSON.stringify(passworDB)) {
    return true
  }
  else return false
}

function serverAnswerShowUser(Id, Username, Phone, Email, Gender, DateBirth, User_role) {
  return {
    status         : 'done',
    user_ID        : Id,
    user_fullname  : Username,
    user_phone     : Phone,
    user_email     : Email,
    user_gender    : Gender,
    user_DOB       : DateBirth,
    user_role      : User_role,
  };
}

exports.loginUser = function loginUser(user_phone, user_password, callback) {
  console.log(user_password)
  var user_Password = hpass.hashPassword(user_password);
  console.log(user_Password)
  var sql = "SELECT * FROM `forum_db`.`users` " +
            "WHERE `forum_db`.`users`.`user_phone` = '" + user_phone + "'";
  con.query(sql, function (err, rows) {
    // console.log(rows[0].user_password)
    // console.log(rows[0].user_DOB)
    var result = {};
    if (compareUserpassword(user_Password, rows[0].user_password) == true) {
      callback(null, JSON.stringify(serverAnswerShowUser(
        rows[0].user_ID,
        rows[0].user_fullname,
        rows[0].user_phone,
        rows[0].user_email,
        rows[0].user_gender,
        rows[0].user_DOB,
        rows[0].user_role,
      )));
    }
    else {
      result = {'status' : 'fail'}
      callback(null, result);
    }
  });
}
