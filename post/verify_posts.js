var con = require('../mysqldb.js');

exports.verifyPost = function verifyPost(token, post_ID, callback) {
  var post_ID = parseInt(post_ID);
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var verifiedDate = dt.format('Y-m-d H:M:S');
  console.log(post_ID)
  var sql = "UPDATE `forum_db`.`posts` " +
            "SET `post_verified`='1', `post_verifiedBy`='" + token + "', `post_verifiedDate`='" + verifiedDate + "' " +
            "WHERE `post_ID`='" + post_ID + "' ";
  con.query(sql, function(err, rows) {
    var result = {};
    console.log(rows.affectedRows);
    if (rows.affectedRows == 1) result = {'status' : 'done'};
    else result = {'status' : 'fail'};
    callback(null, result);
  });
}