var express = require('express')
var router = express.Router();
var fs = require('fs');
var path = require('path');

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
  res.redirect("/secret/" + (req.session.userid || "not_logged_in"));
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
  req.session.user_data = undefined;

  if(req.session.username === 'walwal20'){
    if(req.url === '/' + req.session.userid + '/users_list'){
      req.session.user_data = "";
    }
  }

  return next();
});

// Then we serve the desired HTML/EJS page.
// If the required file has no extension, we assume it to be .ejs and try to render it.
// If it fails to render, we go next().
router.get("*", (req, res, next) => {
  var info = path.parse(req.url);

  if(['', '.html', '.ejs'].indexOf(info.ext) == -1)
    return next();

  if(info.ext == '')
    req.url += '.ejs'

  res.render(path.join("secret" + req.url), {session: req.session}, function(err, html){
    if(err){
      return next(); // By doing next, we will probably fall into the 'page doesnt exist' middleware on index.js
    } else {
      res.send(html);
    }
  });
});

module.exports = {
  router,
  user_has_secret
};