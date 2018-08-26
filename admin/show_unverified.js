var con = require('../mysqldb.js');

function serverAnswerShowUnverifiedPosts(Rows) {
  var result = [];
  for (var i=0; i < Rows.length; i++) {
    result.push({
      post_ID           : Rows[i].post_ID,
      post_title        : Rows[i].post_title,
      post_content      : Rows[i].post_content,
      post_attachment   : Rows[i].post_attachment,
      post_writer       : Rows[i].post_writer,
      post_createdDate  : Rows[i].post_createdDate
    })
  }
  return result;
}

exports.showUnverified = function showUnverified(callback) {
  var sql = "SELECT * FROM `forum_db`.`posts` WHERE `post_verified` = 0";
  con.query(sql, function(err, rows) {
    callback(null, JSON.stringify(serverAnswerShowUnverifiedPosts(rows)));
  });
}
