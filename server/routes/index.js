var express  = require("express");
var router = express.Router({strict: true});
var dbMyip = require("../model/db_myip");
var secretRoutes = require("./secret");

// Handle user privilege variables in req.session
router.use((req, res, next) => {
  if(req.session.username && secretRoutes.userHasSecret(req.session.userid)){
    req.session.specialUser = true;
  } else {
    req.session.specialUser = false;
  }
  return next();
});

router.get("/",              (req, res) => res.render("index", {session: req.session}));
router.get("/index",         (req, res) => res.render("index", {session: req.session}));
router.get("/aboutme",       (req, res) => res.render("aboutme", {session: req.session}));
router.get("/calculator",    (req, res) => res.render("calculator", {session: req.session}));
router.get("/credits",       (req, res) => res.render("credits", {session: req.session}));
router.get("/psp-project-1", (req, res) => res.render("psp-project-1", {session: req.session}));

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

module.exports = router;
