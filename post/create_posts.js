var con = require('../mysqldb.js');

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

exports.createPosts = function createPosts(token, posts_title, posts_content, posts_attachment, callback) {
  var posts_ID = randomInt(0, 999999);
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var createdDate = dt.format('Y-m-d H:M:S');
  var sql = "INSERT INTO `forum_db`.`posts` " +
            "(`post_ID`, `post_title`, `post_content`, `post_attachment`, `post_writer`, `post_verified`, `post_createdDate`) " +
            "VALUES ('" + posts_ID + "', '" + posts_title + "', '" + posts_content + "', '" + posts_attachment + "', '" + token + "', '0', '" + createdDate + "')";
  con.query(sql, function(err, rows) {
    var result;
    if (rows.affectedRows == 1)
      result = {'status' : 'done'};
    else
      result = {'status' : 'fail'};
    callback(null, result);
  });
}
