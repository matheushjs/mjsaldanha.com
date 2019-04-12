var express = require("express");
var router = new express.Router();
var dbUsers = require("../model/db_users");

const SECRET_AUTH = {
  "/": ["walwal20"],
  "/all_users": ["walwal20"],
};

// Middleware for always checking if the user is authorized to access such page
router.use(async (req, res, next) => {
  // req.url is the path relative to secret/; e.g. '/all_users' or '/really_secret/page1'
  var users = SECRET_AUTH[req.url];

  if(users && users.indexOf(req.session.username) >= 0){
    return next();
  }

  req.renderer.messagePage(res, "Sorry, you don't have permission to visit this special page.");
  return null;
});

router.get("/all_users", async (req, res) => {
  var users = await dbUsers.allUsers();
  req.renderer.allUsers(res, users);
});

router.get("/", async (req, res) => {
  req.renderer.secret(res, req.visitorCounter);
});

module.exports = {
  router,
  users: SECRET_AUTH["/"], // We export users that have secret pages
};
