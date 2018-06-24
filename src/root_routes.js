var express  = require("express");
var router = express.Router({strict: true});
var path = require("path");
var ReCaptcha = require("recaptcha2");
var dbUsers = require("./db_users");
var dbMyip = require("./db_myip");
var secretRoutes = require("./secret_routes");

var recaptcha = new ReCaptcha(require("./private_code").recaptchaKeys);

// Handle user privilege variables in req.session
router.use((req, res, next) => {
  if(req.session.username && secretRoutes.userHasSecret(req.session.userid)){
    req.session.specialUser = true;
  } else {
    req.session.specialUser = false;
  }
  return next();
});

router.post("/login", function(req, res){
  if(req.session.username){
    res.render("pages/login", {session: req.session, failMsg: "You're already logged in. Please log out first."});
  } else {
    // Validate/fix fields
    // For username and password, we enforce that no trailing/leading whitespace exist
    var tUsername = req.body.username.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed username
    var tPassword = req.body.password.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed password
    if(tUsername.length !== req.body.username.length || tPassword.length !== req.body.password.length){
      res.render("pages/login", {
        session: req.session,
        failMsg: "Leading/trailing whitespace characters aren't allowed in the password and username fields.",
      });
      return;
    }

    // We also check their lengths
    if(tUsername.length <= 0 || tUsername.length > 128 || tPassword.length <= 0 || tPassword.length > 128){
      res.render("pages/login", {
        session: req.session,
        failMsg: "Username and Password should have at least 1 and at most 128 characters.",
      });
      return;
    }

    dbUsers.authenticate(req.body.username, req.body.password)
    .then((authUser) => {
      if(!authUser){
        res.render("pages/login", {session: req.session, failMsg: "User does not exist. Please, sign up."});
      } else {
        req.session.userid = authUser.id;
        req.session.username = authUser.username;
        req.session.callname = authUser.callname;
        res.redirect("/");
      }
    })
    .catch((err) => console.log(err.stack));
  }
});

router.post("/signup", function(req, res){
  if(req.session.username){
    res.render("pages/message_page", {
      message: "Please, log out of your current account before signing up.",
      session: req.session,
    });
  } else {
    // Validate/fix fields
    // For callname, we just remove trailing/leading whitespace
    req.body.callname = req.body.callname.replace(/^ */g, "").replace(/ *$/g, "");
    // We also check its length
    if(req.body.callname.length <= 0 || req.body.callname.length > 128){
      res.render("pages/signup", {
        session: req.session,
        failMsg: "Name should have at least 1 and at most 128 characters.",
      });
      return;
    }

    // For username and password, we enforce that no trailing/leading whitespace exist
    var tUsername = req.body.username.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed username
    var tPassword = req.body.password.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed password
    var tPassword2 = req.body.password2.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed password2
    if(tUsername.length !== req.body.username.length || tPassword.length !== req.body.password.length || tPassword2.length !== req.body.password2.length){
      res.render("pages/signup", {
        session: req.session,
        failMsg: "Please ensure there are no leading/trailing whitespace characters in your password and username.",
      });
      return;
    }
    // We also check their lengths
    if(tUsername.length <= 0 || tUsername.length > 128 || tPassword.length <= 0 || tPassword.length > 128){
      res.render("pages/signup", {
        session: req.session,
        failMsg: "Username and Password should have at least 1 and at most 128 characters.",
      });
      return;
    }

    // Check if password match
    if(req.body.password !== req.body.password2){
      res.render("pages/signup", {
        session: req.session,
        failMsg: "Passwords didn't match!",
      });
      return;
    }

    recaptcha.validate(req.body["g-recaptcha-response"])
    .catch((err) => {
      res.render("pages/signup", {
        session: req.session,
        failMsg: "ReCAPTCHA validation failed. Please try again.",
      });
      return Promise.reject(undefined);
    })
    .then(() => { return dbUsers.signUp(req.body.username, req.body.password, req.body.callname); })
    .then((authUser) => {
      if(authUser){
        req.session.userid = authUser.id;
        req.session.username = authUser.username;
        req.session.callname = authUser.callname;
        res.redirect("/");
      } else {
        res.render("pages/signup", {
          session: req.session,
          failMsg: "Username already exists. Please, pick another one.",
        });
      }
    })
    .catch((err) => err ? console.log(err.stack) : "");
  }
});

router.route("/account")
.get((req, res) => {
  if(!req.session.userid){ res.redirect("/"); return; }

  res.render("pages/account", {session: req.session});
})
.post((req, res) => {
  if(!req.session.userid){ res.send("Must be logged in to perform this operation."); return; }

  // Validate/fix fields
  // For callname, we just remove trailing/leading whitespace
  req.body.callname = req.body.callname.replace(/^ */g, "").replace(/ *$/g, "");
  // We also check its length
  if(req.body.callname.length <= 0 || req.body.callname.length > 128){
    res.send("Name should have at least 1 and at most 128 characters.");
    return;
  }

  // For the new passwords, we enforce that no trailing/leading whitespace exist
  if(req.body.cur_password){
    var tPassword = req.body.password.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed password
    var tPassword2 = req.body.password2.replace(/^ */g, "").replace(/ *$/g, ""); // trimmed password2
    if(tPassword.length !== req.body.password.length || tPassword2.length !== req.body.password2.length){
      res.send("Please ensure there are no leading/trailing whitespace characters in your new password.");
      return;
    }
    // We also check their lengths
    if(tPassword.length <= 0 || tPassword.length > 128){
      res.send("Password should have at least 1 and at most 128 characters.");
      return;
    }

    // Check if password match
    if(req.body.password !== req.body.password2){
      res.send("Passwords don't match!");
      return;
    }
  }
  
  // Now for matters that involve the database
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
  req.session.destroy(function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.use("/secret", secretRoutes.router);

router.route("/myip")
.get((req, res) => {
  dbMyip.get().then((myip) => {
    res.send(myip.replace(/ /g, ""));
  }).catch((err) => console.log(err.stack));
})
.post((req, res) => {
  if(req.body.ip && req.body.ip.length <= 20){
    dbMyip.insert(req.body.ip).catch((err) => console.log(err.stack));
    res.send("Ok");
  } else {
    res.send("Error");
  }
});

// Set default EJS file rendering (First look in "pages/")
router.get("*", require("./ejs_default").create("pages"));
router.get("*", require("./ejs_default").create(""));

// Set for serving static files (must come after setting up our routes)
router.use(express.static(path.resolve("./client")));

// Set up failsafe for non-found pages
router.get("*", (req, res) => {
  res.render("pages/message_page", {
    message: "Sorry! The requested page doesn't seem to exist.",
    session: req.session,
  });
});

module.exports = router;
