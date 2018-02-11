var router = require('express').Router();

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
    res.render("pages/login");
  });

router.route("/signup")
  .get(function(req, res){
    res.render("pages/signup");
  })
  .post(function(req, res){
    res.render("pages/signup");
  });

router.get("*", (req, res) => {
  res.render("pages/message_page", {message: "Sorry! The requested page doesn't seem to exist."});
});

module.exports = router