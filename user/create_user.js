var con = require('../mysqldb.js');
var hpass = require('../hash_password.js')

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

// function checkPhone(user_phone, callback) {
//   var sql = "SELECT count(*) as check_phone FROM `forum_db`.`users` " +
//             "WHERE `forum_db`.`users`.`user_phone` = '" + user_phone + "'";
//   con.query(sql, function (err, rows) {
//     if (rows[0].check_phone == 1) {
//       var result = { 'check_phone' : 'false' }
//       callback(null, result)
//     }
//     else {
//       var result = { 'check_phone' : ' done' }
//       callback(null, result)
//     }
//   });
// }

// function checkEmail(user_email) {
//   var sql = "SELECT count(*) as check_email FROM `forum_db`.`users` " +
//             "WHERE `forum_db`.`users`.`user_email` = '" + user_email + "'";
//   var result = ""
//   con.query(sql, result, function (err, rows) {
//     console.log(result)
//     if (rows[0].check_email == 1) {
//       result.concat("F")
//     }
//     else {
//         result.concat("T")
//     }
//   });
//   console.log(result)
// }

exports.createUser = function createUser(user_fullname, user_password, user_phone, user_email, user_gender, user_DOB, callback) {
  // checkEmail(user_email)
  // var CheckEmail = checkEmail(user_email)
  // var checkAll = checkDuplicate(checkPhone, CheckEmail);
  // console.log(checkAll, checkPhone, CheckEmail)
  var user_ID = randomInt(100000, 999999);
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var createdDate = dt.format('Y-m-d H:M:S');
  var user_Password = hpass.hashPassword(user_password);
  var sql = "INSERT INTO `forum_db`.`users` " +
            "(`user_ID`, `user_fullname`, `user_password`, `user_phone`, `user_email`, `user_gender`, `user_DOB`, `user_role`, `user_createdDate`) " +
            "VALUES ('" + user_ID + "', '" + user_fullname + "', '" + user_Password + "', '" + user_phone + "', '" + user_email + "', '" + user_gender + "', '" + user_DOB + "', '1', '" + createdDate + "')";
  con.query(sql, function(err, rows) {
    if (err) throw err;
    var result = {'status' : 'done'};
    callback(null, result);
  });
}
