var express = require("express");
var router = new express.Router();

router.get("/login", async (req, res) => req.renderer.login(res));
router.get("/signup", async (req, res) => req.renderer.signup(res));
router.get("/account", async (req, res) => {
  // Confirm user is logged in
  if(!req.session.userid){
    res.redirect("/");
  } else {
    req.renderer.account(res);
  }
});

router.route("/logout")
.get(async (req, res) => {
  req.session.username = null;
  req.session.callname = null;
  req.session.userid   = null;
  res.redirect("/");
});

module.exports = router;
