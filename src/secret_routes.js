var express = require('express')
var router = express.Router();
var fs = require('fs');
var path = require('path');
var auth = require('./authentication');

// Returns whether user with id 'id' has a secret page.
function user_has_secret(userid){
  dirs = fs.readdirSync('./client/secret');

  for(var i = 0; i < dirs.length; i++){
    dirs[i] = Number(dirs[i]);
  }

  return dirs.indexOf(Number(userid)) != -1;
}

// For the root URL, we unconditionally redirect the user to their index.
// If it doesn't exist, let the other middlewares handle it.
router.get("/", (req, res) => {
  res.redirect("/secret/" + (req.session.userid || "not_logged_in") + "/");
});

// Middleware for always checking if the user is authorized
router.use((req, res, next) => {
  // Take the id of the URL. From '/secret/1/...', take 1.
  var id = Number(req.url.split('/').filter(str => { return str !== ''; })[0]);

  if(id && user_has_secret(req.session.userid) && Number(req.session.userid) === id){
    return next();
  } else {
    res.render("pages/message_page", {
      session: req.session,
      message: "Sorry, there is nothing special for you yet.",
    });
  }
});

// Middleware for providing req.session with data specific to each user
router.use((req, res, next) => {
  if(req.session.user_data) return next();
  req.session.user_data = {}

  if(req.session.username === 'walwal20'){
    auth.all_users()
    .then(users => {
      req.session.user_data.all_users = users.sort((a, b) => { return a.id > b.id; });
      return next();
    })
    .catch(err => console.log(err.stack));
  } else {
    return next();
  }
});

// Set default EJS rendering.
router.get("*", require('./ejs_default').create(''));

// Then we serve all other files statically
router.use(express.static(path.resolve('./client/secret')));

module.exports = {
  router,
  user_has_secret
};