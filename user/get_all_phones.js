var con = require('../mysqldb.js');

var gap = ""

function storeAllPhones(Rows) {
  var result = [];
  for (var i=0; i < Rows.length; i++) {
    result.push({
      user_phone : Rows[i].user_phone,
    })
  }
  return result;
}

function getAllPhones() {
  var sql = "SELECT `forum_db`.`users`.`user_phone` FROM `forum_db`.`users`";
  con.query(sql, function (err, rows) {
    var gap = storeAllPhones(rows)
  });
}

getAllPhones()

console.log(gap)
