var router = require('express').Router();
var auth = require('./authentication');

var sess = {};

router.all("*", (req, res, next) => {
  console.log("Session: " + sess.username);
  next();
});

// Set routes
router.get("/", (req, res) => {
  res.render("pages/index");
});

router.get("/calculator", (req, res) => {
  res.render("pages/calculator");
});

router.get("/aboutme", (req, res) => {
  res.render("pages/aboutme");
});

router.route("/login")
.get(function(req, res){
  res.render("pages/login");
})
.post(function(req, res){
  if(auth.lookup(req.body.username)){
    sess = req.session;
    sess.username = req.body.username;
    console.log("Logged in.");
  } else {
    console.log("Failed to log in.");
  }

  res.render("pages/login");
});

router.route("/signup")
.get(function(req, res){
  res.render("pages/signup");
})
.post(function(req, res){
  if(auth.sign_up(req.body.username, req.body.password, req.body.name)){
    auth.print();
  } else {
    console.log("Failed with: " + JSON.stringify(req.body));
  }

  res.render("pages/signup");
});

router.get("*", (req, res) => {
  res.render("pages/message_page", {message: "Sorry! The requested page doesn't seem to exist."});
});

module.exports = router