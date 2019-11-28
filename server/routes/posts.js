const express  = require("express");
var router = new express.Router();

router.get("/music-normalization", async (req, res) => res.renderer.markdownPage("posts/music-normalization.md", "How to Normalize Your Music Library"));
router.get("/elfDistr", async (req, res) => res.renderer.markdownPage("posts/elfDistr.md", "R Package 'elfDistr'"));

module.exports = router;