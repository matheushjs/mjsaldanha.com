var express = require("express");
var router = new express.Router();

router.get("/",             async (req, res) => res.renderer.render("articles/index"));
router.get("/1-hpc-sspi/",  async (req, res) => res.renderer.render("articles/1-hpc-sspi"));
router.get("/2-exec-time/", async (req, res) => res.renderer.markdownPage("articles/2-exec-time"));
router.get("/3-probability-distribution-of-execution-times/", async (req, res) => res.renderer.markdownPage("articles/3-probability-distribution-of-execution-times.md"));

module.exports = router;
