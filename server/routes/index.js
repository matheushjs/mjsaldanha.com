var express  = require("express");
var router = new express.Router({strict: true});
var dbMyip = require("../model/db_myip");
var sciProjectsRouter = require("./sci-projects");

router.get("/",              (req, res) => req.renderer.render(res, "index"));
router.get("/index",         (req, res) => req.renderer.render(res, "index"));
router.get("/calculator",    (req, res) => req.renderer.render(res, "calculator"));
router.get("/credits",       (req, res) => req.renderer.render(res, "credits"));

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

router.use("/sci-projects", sciProjectsRouter);

// Serve apps
router.get("/myapps/tictactoe", (req, res) => req.renderer.render(res, "myapps/tictactoe"));

module.exports = router;
