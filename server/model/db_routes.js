var express = require("express");
var router = new express.Router();
var dbUsers = require("./db_users");

router.post("/login", async (req, res) => {
  if(req.session.username){
    res.json({
      errorTxt: "You're already logged in. Please log out first.",
      errorNum: 1,
    });
    return;
  }

  var authUser = await dbUsers.authenticate(req.body.username, req.body.password);
  if(!authUser){
    res.json({
      errorTxt: "User does not exist. Please, sign up.",
      errorNum: 2
    });
    return;
  }

  req.session.userid = authUser.id;
  req.session.username = authUser.username;
  req.session.callname = authUser.callname;
  res.json({
    success: true
  });
});

module.exports = router;