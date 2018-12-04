var express = require("express");
var router = new express.Router();

router.get("/",           async (req, res) => req.renderer.render(res, "articles/index"));
router.get("/1-hpc-sspi/", async (req, res) => req.renderer.render(res, "articles/1-hpc-sspi/index"));

module.exports = router;
