var express = require('express')
var router = express.Router();
var fs = require('fs');

// Returns whether user with id 'id' has a secret page
function user_has_secret(userid){
  dirs = fs.readdirSync('./client/secret_pages');

  for(var i = 0; i < dirs.length; i++){
    dirs[i] = Number(dirs[i]);
  }

  return dirs.indexOf(Number(userid)) != -1;
}

// For the root URL, we render index.
router.get("/", (req, res) => {
  if(user_has_secret(req.session.userid)){
    res.render("secret_pages/" + req.session.userid + "/index", {session: req.session});
  } else res.render("pages/message_page", {
    session: req.session,
    message: "Sorry, there is nothing special for you yet.",
  });
});

module.exports = {
  router,
  user_has_secret
};