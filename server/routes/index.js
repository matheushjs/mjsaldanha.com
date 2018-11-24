var express  = require("express");
var router = new express.Router();
var dbMyip = require("../model/db_myip");

// Serve home page in multiple languages for Google Crawlers (the Renderer takes care of serving correct language).
router.get("/",         async (req, res) => req.renderer.render(res, "index"));
router.get("/ja",       async (req, res) => req.renderer.render(res, "index"));

router.get("/index",    async (req, res) => req.renderer.render(res, "index"));
router.get("/credits",  async (req, res) => req.renderer.render(res, "credits"));
router.get("/palletes", async (req, res) => req.renderer.render(res, "palletes"));

router.route("/myip")
.get(async (req, res) => {
  try {
    var myip = await dbMyip.get();
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.send(myip.replace(/ /g, ""));
  } catch(err) {
    console.log(err.stack);
  }
})
.post(async (req, res) => {
  if(req.body.ip && req.body.ip.length <= 20){
    try {
      await dbMyip.insert(req.body.ip);
      res.send("Ok");
    } catch(err) {
      console.log(err.stack);
    }
  } else {
    res.send("Error");
  }
});

// Serve apps
// router.get("/myapps/tictactoe", async (req, res) => req.renderer.render(res, "myapps/tictactoe"));

// Set Redirections
router.get("/siicusp18", async (req, res) => res.redirect("/sci-projects/1-psp-project-1"));


module.exports = router;
