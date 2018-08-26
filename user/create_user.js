var con = require('../mysqldb.js');
var hpass = require('../hash_password.js')
function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

exports.createUser = function createUser(user_fullname, user_password, user_phone, user_email, user_gender, user_DOB, callback) {
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
