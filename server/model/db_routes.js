var express = require("express");
var router = new express.Router();
var ReCaptcha = require("recaptcha2");
var dbUsers = require("./db_users");

var ReCaptchaValidator;
try {
  ReCaptchaValidator = new ReCaptcha(require("../routes/private_code").recaptchaKeys);
} catch(err) {
  ReCaptchaValidator = null;
  console.log(err.message);
}

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

router.post("/signup", async (req, res) => {
  // See if user is already logged in
  if(req.session.username){
    res.json({
      errorTxt: "Please, log out of your current account before signing up.",
      errorNum: 1
    });
    return;
  }

  if(!ReCaptchaValidator){
    res.json({
      errorTxt: "Could not load ReCAPTCHA in the server. I am sorry for this. Please sign up at a later time.",
      errorNum: 2
    });
    return;
  }

  // Validate recaptcha
  try {
    await ReCaptchaValidator.validate(req.body.recaptcha);
  } catch(err){
    res.json({
      errorTxt: "ReCAPTCHA validation failed. Please try again.",
      errorNum: 3
    });
    console.log("Recaptcha error: " + err);
    return;
  }

  // Sign user up in database
  var authUser = await dbUsers.signUp(req.body.username, req.body.password, req.body.callname);
  if(authUser){
    req.session.userid = authUser.id;
    req.session.username = authUser.username;
    req.session.callname = authUser.callname;
    res.json({
      success: true
    });
  } else {
    res.json({
      errorTxt: "Username already exists. Please, pick another one.",
      errorNum: 4
    });
    return;
  }
});

router.post("/account", async (req, res) => {
  // Check if user is logged in
  if(!req.session.userid){
    res.json({
      errorTxt: "You must be logged in to change your account information.",
      errorNum: 1
    });
    return;
  }

  if(typeof(req.body["cur_password"]) === "undefined"){
    // Only callname to update
    user = await dbUsers.updateUser({id: req.session.userid, callname: req.body.callname});

    if(user){
      // Update session
      req.session.callname = user.callname;

      // Signalize a success
      res.json({ success: true });
    } else {
      res.json({
        errorTxt: "Sorry, something went wrong in our database. Try again later.",
        errorNum: 2
      });
    }
  } else {
    user = await dbUsers.authenticate(req.session.username, req.body.cur_password);
    if(!user){
      res.json({
        errorTxt: "Wrong current password!",
        errorNum: 3
      });
      return;
    }

    user = await dbUsers.updateUser({id: req.session.userid, callname: req.body.callname, password: req.body.password});
    // Update session
    req.session.callname = user.callname;
    res.json({ success: true });
  }
});

module.exports = router;