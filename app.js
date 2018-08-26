var express    = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dateTime = require('node-datetime');

var app = express();
var db  = require('./mysqldb');

var hPassword  = require('./hash_password.js');
var cUser = require('./user/create_user.js');
var lUser = require('./user/login_user.js');
var loUser = require('./user/logout_user.js');
var cPhone = require('./user/check_phone.js');
var cPost = require('./post/create_posts.js');
var vPost = require('./post/verify_posts.js');
var suvPost = require('./admin/show_unverified.js');
var svPost = require('./user/show_verified.js');

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

app.use(cookieParser());
app.use(session({
  secret : "secret",
  saveUninitialized: false,
  resave: true
}));

var sess;

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

app.post('/login', function(req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /login")
  sess = req.session;
  var user_phone = req.body.user_phone;
  var user_password = req.body.user_password;
  lUser.loginUser(user_phone, user_password, function(err, result, user_ID) {
    if (user_ID != null) {
      sess.token = user_ID;
    }
    console.log(result);
    console.log(sess.token);
    res.send(result);
  });
});

// app.get('/logout', function (req, res) {
//   let createdDate = dateTime.create().format('Y-m-d H:M:S')
//   console.log("[" + createdDate + "] " + "GET /logout")
//   req.logout;
//   res.send("status done");
// });

app.get('/logout', function(req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "GET /logout")
  var token = sess.token;
  loUser.logoutUser(sess, function(err, result) {
    console.log(result)
    res.send(result)
    //res.redirect('/login')
  })
})

app.post('/create_posts', function(req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /create_posts")
  var posts_title = req.body.posts_title;
  var posts_content = req.body.posts_content;
  var posts_attachment = req.body.posts_attachment;
  var token = sess.token;
  cPost.createPosts(token, posts_title, posts_content, posts_attachment, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/verify_post', function(req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /verify_post")
  var post_ID = req.body.post_ID;
  var token = sess.token;
  vPost.verifyPost(token, post_ID, function(err, result) {
    console.log(result);
    res.send(result);
  });
});

app.get('/show_unverified', function(req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "GET /show_unverified")
  console.log("show_unverified");
  suvPost.showUnverified(function(err, result) {
    console.log(result);
    res.send(result);
  });
});

app.get('/show_verified', function(req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "GET /show_verified")
  console.log("show_verified");
  svPost.showVerified(function(err, result) {
    console.log(result);
    res.send(result);
  });
});

module.exports = app;
