var express  = require("express");
var router = express.Router({strict: true});
var dbMyip = require("../model/db_myip");

router.get("/",              (req, res) => req.renderer.render(res, "index"));
router.get("/index",         (req, res) => req.renderer.render(res, "index"));
router.get("/aboutme",       (req, res) => req.renderer.render(res, "aboutme"));
router.get("/calculator",    (req, res) => req.renderer.render(res, "calculator"));
router.get("/credits",       (req, res) => req.renderer.render(res, "credits"));
router.get("/psp-project-1", (req, res) => req.renderer.render(res, "psp-project-1"));

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
