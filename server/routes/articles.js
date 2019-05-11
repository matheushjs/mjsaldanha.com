var express = require("express");
var router = new express.Router();

router.get("/",            async (req, res) => res.renderer.render("articles/index"));
router.get("/1-hpc-sspi/", async (req, res) => res.renderer.render("articles/1-hpc-sspi/index"));

module.exports = router;
