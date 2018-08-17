var express    = require('express');
var bodyParser = require('body-parser');

var app = express();
var db  = require('./mysqldb');

var hPassword  = require('./hash_password.js');
var cUser = require('./user/create_user.js');
var lUser = require('./user/login_user.js');
var cPhone = require('./user/check_phone.js');

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',
                'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
                'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/signup', function(req, res) {
  console.log("/signup");
  var user_fullname = req.body.user_fullname;
  var user_password = req.body.user_password;
  var user_phone = req.body.user_phone;
  var user_email = req.body.user_email;
  var user_gender = req.body.user_gender;
  var user_DOB = req.body.user_DOB;
  cUser.createUser(user_fullname, user_password, user_phone, user_email, user_gender, user_DOB, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/login',function(req,res) {
console.log("/login");
var user_phone = req.body.user_phone;
var user_password = req.body.user_password;
  lUser.loginUser(user_phone, user_password, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/check_phone',function(req,res) {
console.log("/check_phone");
var user_phone = req.body.user_phone;
  cPhone.checkPhone(user_phone, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

module.exports = app;
