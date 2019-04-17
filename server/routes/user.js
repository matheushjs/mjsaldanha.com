var express = require("express");
var router = new express.Router();
var dbUsers = require("../model/db_users");

/* Validates fields.
 * If both passwords are given, they are checked for equality.
 * Returns an object with:
 *   failMsg: message saying what went wrong.
 *   success: boolean telling if validation was successful
 */
function validateFields(username = null, password1 = null, password2 = null, callname = null){
  var retVal = {
    failMsg: "",
    success: false,
  };

  if(username !== null){
    let trimmed = username.trim();

    // Leading/trailing whitespace
    if(username.length !== trimmed.length){
      retVal.failMsg = "Please ensure there are no leading/trailing whitespace characters in your username.";
      return retVal;
    }
  }

  if(password1 !== null){
    let trimmed = password1.trim();

    // Leading/trailing whitespace
    if(password1.length !== trimmed.length){
      retVal.failMsg = "Please ensure there are no leading/trailing whitespace characters in your passwords.";
      return retVal;
    }

    // Length
    if(password1.length <= 0 || password1.length > 128){
      retVal.failMsg = "Password should have at least 1 and at most 128 characters.";
      return retVal;
    }
  }

  if(password2 !== null){
    let trimmed = password2.trim();

    // Leading/trailing whitespace
    if(password2.length !== trimmed.length){
      retVal.failMsg = "Please ensure there are no leading/trailing whitespace characters in your passwords.";
      return retVal;
    }

    // Length
    if(password2.length <= 0 || password2.length > 128){
      retVal.failMsg = "Password should have at least 1 and at most 128 characters.";
      return retVal;
    }
  }

  if(password1 !== null && password2 !== null){
    // Equality
    if(password1 !== password2){
      retVal.failMsg = "Passwords don't match!";
      return retVal;
    }
  }

  if(callname !== null){
    if(callname.length <= 0 || callname.length > 128){
      retVal.failMsg = "Name should have at least 1 and at most 128 characters.";
      return retVal;
    }
  }

  retVal.success = true;
  return retVal;
}

router.get("/login", async (req, res) => req.renderer.login(res));

router.get("/signup", async (req, res) => {
  // Check ReCaptcha. Sign up is disabled if it doesn't work.
  if(!recaptcha)
    req.renderer.messagePage(res, "ReCaptcha could not be loaded in the server. I am sorry about this. Please sign up in a later time.");

  req.renderer.signup(res);
});



router.route("/account")
// Check if user is logged in
.all(async (req, res, next) => {
  if(!req.session.userid){
    res.redirect("/");
  } else {
    next();
  }
})
// Serve GET requests
.get(async (req, res) => {
  req.renderer.account(res);
})
// Validate Fields
.post(async (req, res, next) => {
  // For callname, we just remove trailing/leading whitespace
  req.body.callname = req.body.callname.replace(/^ */g, "").replace(/ *$/g, "");

  if(!req.body.cur_password){
    req.body.password = null;
    req.body.password2 = null;
  }

  let check = validateFields(req.body.username, req.body.password, req.body.password2, req.body.callname);
  if(!check.success){
    res.send(check.failMsg);
  } else {
    next();
  }
})
// Handle database
.post(async (req, res) => {
  var user;

  if(!req.body.cur_password){
    // Only callname to update
    user = await dbUsers.updateUser({id: req.session.userid, callname: req.body.callname});

    if(user){
      // Update session
      req.session.callname = user.callname;

      // Signalize a success
      res.send("");
    } else {
      res.send("Sorry, something went wrong in our database. Try again later.");
    }
  } else {
    user = await dbUsers.authenticate(req.session.username, req.body.cur_password);
    if(!user){
      res.send("Wrong current password!");
      return;
    }

    user = await dbUsers.updateUser({id: req.session.userid, callname: req.body.callname, password: req.body.password});
    // Update session
    req.session.callname = user.callname;
    // Signalize a success
    res.send("");
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
