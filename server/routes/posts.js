const express  = require("express");
var router = new express.Router();

router.get("/music-normalization", async (req, res) => res.renderer.markdownPage("posts/music-normalization.md", "How to Normalize Your Music Library"));
router.get("/ggamma", async (req, res) => res.renderer.markdownPage("posts/ggamma.md", "R Package 'ggamma'"));

module.exports = router;