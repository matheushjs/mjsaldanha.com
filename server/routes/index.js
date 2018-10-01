var express  = require("express");
var router = new express.Router();
var dbMyip = require("../model/db_myip");
var sciProjectsRouter = require("./sci-projects");

router.get("/",              (req, res) => req.renderer.render(res, "index"));
router.get("/index",         (req, res) => req.renderer.render(res, "index"));
router.get("/credits",       (req, res) => req.renderer.render(res, "credits"));
router.get("/palletes",      (req, res) => req.renderer.render(res, "palletes"));

router.route("/myip")
.get((req, res) => {
  dbMyip.get().then((myip) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
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

router.use("/sci-projects", sciProjectsRouter);

// Serve apps
// router.get("/myapps/tictactoe", (req, res) => req.renderer.render(res, "myapps/tictactoe"));

// Redirections
router.get("/siicusp18", (req, res) => res.redirect("/sci-projects/1-psp-project-1"));


module.exports = router;
