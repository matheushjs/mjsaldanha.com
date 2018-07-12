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

module.exports = router;
