var md5 = require('md5');

exports.hashPassword = function hashPassword (user_password) {
  return md5(user_password)
}
// var a = md5("linh812188");
// console.log(a);
// var b = md5("linh812188");
// console.log(b);