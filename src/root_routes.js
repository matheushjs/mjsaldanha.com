var router = require('express').Router();
var auth = require('./authentication');

// Set routes
router.get("/", (req, res) => {
  res.render("pages/index", {session: req.session});
});

router.get("/calculator", (req, res) => {
  res.render("pages/calculator", {session: req.session});
});

router.get("/aboutme", (req, res) => {
  res.render("pages/aboutme", {session: req.session});
});

router.route("/login")
.get(function(req, res){
  res.render("pages/login", {session: req.session});
})
.post(function(req, res){
  if(req.session.username){
    res.render("pages/login", {session: req.session, fail_msg: "You're already logged in. Please log out first."});
  } else if(auth.lookup(req.body.username)){
    req.session.username = req.body.username;
    res.redirect("/");
  } else {
    console.log("Failed to log in.");
    res.render("pages/login", {session: req.session, fail_msg: "User does not exist. Please, sign up."});
  }
});

router.route("/signup")
.get(function(req, res){
  res.render("pages/signup", {session: req.session});
})
.post(function(req, res){
  if(req.session.username){
    res.render("pages/message_page", {
      message: "Please, log out of your current account before signing up.",
      session: req.session,
    });
  } else if(auth.sign_up(req.body.username, req.body.password, req.body.name)){
    req.session.username = req.body.username;
    res.redirect("/");
  } else {
    res.render("pages/signup", {
      session: req.session,
      fail_msg: "Username already exists. Please, pick another one.",
    });
  }
});

router.route("/logout")
.get(function(req, res){
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

router.get("*", (req, res) => {
  res.render("pages/message_page", {
    message: "Sorry! The requested page doesn't seem to exist.",
    session: req.session,
  });
});

module.exports = router