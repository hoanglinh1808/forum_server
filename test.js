// function checkPhone(user_phone) {
//   var user_phone = "0913456789"
//   var filter = /^(01[2689]|09|08)[0-9]{8}$/;
//   if (filter.test(user_phone)) {
//     console.log("true");
//   }
//   else {
//     console.log("false");
//   }
// }
// checkPhone();

// var dateTime = require('node-datetime');
// var dt = dateTime.create();
// var createdDate = dt.format('Y-m-d H:M:S');
// console.log(createdDate)

// function checkEmail() {
//   var sql = "SELECT * FROM `forum_db`.`users` " +
//             "WHERE `forum_db`.`users`.`user_email` = '1234@email.com'";
//   con.query(sql, function (err, rows) {
//     if (rows.length > 0) console.log("true");
//     else return console.log("false");
//   });
// }
// checkEmail()