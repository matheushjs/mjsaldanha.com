var express  = require("express");
var router = new express.Router({strict: true});
var ReCaptcha = require("recaptcha2");
var dbUsers = require("../model/db_users");

var recaptcha;
try {
  recaptcha = new ReCaptcha(require("./private_code").recaptchaKeys);
} catch(err) {
  recaptcha = null;
  console.log(err.message);
}

router.route("/login")
.get((req, res) => {
  req.renderer.login(res);
})
.post((req, res) => {
  if(req.session.username){
    req.renderer.login(res, "You're already logged in. Please log out first.");
  } else {
    let check = validateFields(req.body.username, req.body.password);
    if(!check.success){
      req.renderer.login(res, check.failMsg);
      return;
    }

    dbUsers.authenticate(req.body.username, req.body.password)
    .then((authUser) => {
      if(!authUser){
        req.renderer.login(res, "User does not exist. Please, sign up.");
      } else {
        req.session.userid = authUser.id;
        req.session.username = authUser.username;
        req.session.callname = authUser.callname;
        res.redirect("/");
      }
    });
  }
});


router.route("/signup")
// Check ReCaptcha. Sign up is disabled if it doesn't work.
.all((req, res, next) => {
  if(!recaptcha){
    req.renderer.messagePage(res, "ReCaptcha could not be loaded in the server.");
  } else {
    next();
  }
})
// Serve GET request
.get((req, res) => {
  req.renderer.signup(res);
})
// Check if user isn't logged in already
.post((req, res, next) => {
  if(req.session.username){
    req.renderer.messagePage(res, "Please, log out of your current account before signing up.");
  } else {
    next();
  }
})
// Validate fields
.post((req, res, next) => {
  // Validate/fix fields
  // For callname, we just remove trailing/leading whitespace
  req.body.callname = req.body.callname.replace(/^ */g, "").replace(/ *$/g, "");
  
  let check = validateFields(req.body.username, req.body.password, req.body.password2, req.body.callname);
  if(!check.success){
    req.renderer.signup(res, check.failMsg);
  } else {
    next();
  }
})
// Validate ReCaptcha
.post((req, res, next) => {
  recaptcha.validate(req.body["g-recaptcha-response"])
  .then(() => {
    next();
  })
  .catch((err) => {
    req.renderer.signup(res, "ReCAPTCHA validation failed. Please try again.");
  });
})
// Sign user up in database
.post((req, res) => {
  dbUsers.signUp(req.body.username, req.body.password, req.body.callname)
  .then((authUser) => {
    if(authUser){
      req.session.userid = authUser.id;
      req.session.username = authUser.username;
      req.session.callname = authUser.callname;
      res.redirect("/");
    } else {
      req.renderer.signup(res, "Username already exists. Please, pick another one.");
    }
  });
});


router.route("/account")
// Check if user is logged in
.all((req, res, next) => {
  if(!req.session.userid){
    res.redirect("/");
  } else {
    next();
  }
})
// Serve GET requests
.get((req, res) => {
  req.renderer.account(res);
})
// Validate Fields
.post((req, res, next) => {
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
.post((req, res) => {
  if(!req.body.cur_password){
    // Only callname to update
    dbUsers.updateUser({id: req.session.userid, callname: req.body.callname})
    .then((user) => {
      // Update session
      req.session.callname = user.callname;

      // Signalize a success
      res.send("");
    })
    .catch((err) => {
      res.send("Sorry, something went wrong in our database. Try again later.");
      console.log(err.stack);
    });
  } else {
    dbUsers.authenticate(req.session.username, req.body.cur_password)
    .then((user) => {
      if(!user){
        res.send("Wrong current password!");
        return;
      }
      
      return dbUsers.updateUser({id: req.session.userid, callname: req.body.callname, password: req.body.password});
    })
    .then((user) => {
      // Update session
      req.session.callname = user.callname;

      // Signalize a success
      res.send("");
    })
    .catch((err) => {
      res.send("Sorry, something went wrong in our database. Try again later.");
      console.log(err.stack);
    });
  }
});

router.route("/logout")
.get(function(req, res){
  req.session.username = null;
  req.session.callname = null;
  req.session.userid   = null;
  res.redirect("/");
});

// Removes whitespace from left and right sides of the string
function stringTrim(string){
  return string.replace(/^ */g, "").replace(/ *$/g, "");
}

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
    let trimmed = stringTrim(username);

    // Leading/trailing whitespace
    if(username.length !== trimmed.length){
      retVal.failMsg = "Please ensure there are no leading/trailing whitespace characters in your username.";
      return retVal;
    }
  }

  if(password1 !== null){
    let trimmed = stringTrim(password1);
    
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
    let trimmed = stringTrim(password2);
    
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

module.exports = router;
