const express  = require("express");
const fs = require("fs");
var router = new express.Router();

router.get("/", async (req, res) => {
  let files = fs.readdirSync("server/view/pages/posts/").filter(value => value.endsWith(".md"));

  let items = files.map(value => Object({
    link: ("/posts/" + value.slice(0, -3)),
    title: value.slice(0, -3)
  }));

  res.renderer.postList(items);
});

router.get("/music-normalization", async (req, res) => res.renderer.markdownPage("posts/music-normalization.md", "How to Normalize Your Music Library"));
router.get("/ggamma", async (req, res) => res.renderer.markdownPage("posts/ggamma.md", "R Package 'ggamma'"));

module.exports = router;