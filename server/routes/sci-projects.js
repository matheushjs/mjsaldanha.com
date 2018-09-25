var express = require("express");
var router = new express.Router();

router.get("/",                 (req, res) => req.renderer.render(res, "sci-projects/index"));
router.get("/1-psp-project-1/", (req, res) => req.renderer.render(res, "sci-projects/1-psp-project-1/index"));

module.exports = router;
