var router = require('express').Router();
var auth = require('./authentication');
var secret_routes = require("./secret_routes");

// Handle user privilege variables in req.session
router.use((req, res, next) => {
  if(req.session.username && secret_routes.user_has_secret(req.session.userid)){
    req.session.special_user = true;
  } else {
    req.session.special_user = false;
  }
  next();
});

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
  } else {
    // Validate/fix fields
    // For username and password, we enforce that no trailing/leading whitespace exist
    tUsername = req.body.username.replace(/^ */g, '').replace(/ *$/g, ''); // trimmed username
    tPassword = req.body.password.replace(/^ */g, '').replace(/ *$/g, ''); // trimmed password
    if(tUsername.length !== req.body.username.length || tPassword.length !== req.body.password.length){
      res.render("pages/login", {
        session: req.session,
        fail_msg: "Leading/trailing whitespace characters aren't allowed in the password and username fields.",
      });
      return;
    }

    // We also check their lengths
    if(tUsername.length <= 0 || tUsername.length > 128 || tPassword.length <= 0 || tPassword.length > 128){
      res.render("pages/login", {
        session: req.session,
        fail_msg: "Username and Password should have at least 1 and at most 128 characters.",
      });
      return;
    }

    auth.authenticate(req.body.username, req.body.password)
    .then(authUser => {
      if(!authUser){
        res.render("pages/login", {session: req.session, fail_msg: "User does not exist. Please, sign up."});
      } else {
        req.session.userid = authUser.id;
        req.session.username = authUser.username;
        req.session.callname = authUser.callname;
        res.redirect("/");
      }
    })
    .catch(err => console.log(err.stack));
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
  } else {
    // Validate/fix fields
    // For callname, we just remove trailing/leading whitespace
    req.body.callname = req.body.callname.replace(/^ */g, '').replace(/ *$/g, '');
    // We also check its length
    if(req.body.callname.length <= 0 || req.body.callname.length > 128){
      res.render("pages/signup", {
        session: req.session,
        fail_msg: "Name should have at least 1 and at most 128 characters.",
      });
      return;
    }

    // For username and password, we enforce that no trailing/leading whitespace exist
    tUsername = req.body.username.replace(/^ */g, '').replace(/ *$/g, ''); // trimmed username
    tPassword = req.body.password.replace(/^ */g, '').replace(/ *$/g, ''); // trimmed password
    tPassword2 = req.body.password2.replace(/^ */g, '').replace(/ *$/g, ''); // trimmed password2
    if(tUsername.length !== req.body.username.length || tPassword.length !== req.body.password.length || tPassword2.length !== req.body.password2.length){
      res.render("pages/signup", {
        session: req.session,
        fail_msg: "Please ensure there are no leading/trailing whitespace characters in your password and username.",
      });
      return;
    }
    // We also check their lengths
    if(tUsername.length <= 0 || tUsername.length > 128 || tPassword.length <= 0 || tPassword.length > 128){
      res.render("pages/signup", {
        session: req.session,
        fail_msg: "Username and Password should have at least 1 and at most 128 characters.",
      });
      return;
    }

    // Check if password match
    if(req.body.password !== req.body.password2){
      res.render("pages/signup", {
        session: req.session,
        fail_msg: "Passwords didn't match!",
      });
      return;
    }

    auth.sign_up(req.body.username, req.body.password, req.body.callname)
    .then(authUser => {
      if(authUser){
        req.session.userid = authUser.id;
        req.session.username = authUser.username;
        req.session.callname = authUser.callname;
        res.redirect("/");
      } else {
        res.render("pages/signup", {
          session: req.session,
          fail_msg: "Username already exists. Please, pick another one.",
        });
      }
    })
    .catch(err => console.log(err.stack));
  }
});

router.route('/account')
.get((req, res) => {
  if(!req.session.userid){ res.redirect("/"); return; }

  res.render("pages/account", {session: req.session});
})
.post((req, res) => {
  if(!req.session.userid){ res.redirect("/"); return; }

  res.render("pages/account", {session: req.session, fail_msg: "Sorry, I haven't implemented this feature yet."});
})

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

router.use("/secret", secret_routes.router);

module.exports = router