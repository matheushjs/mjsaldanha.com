var express = require("express");
var router = new express.Router();

router.get("/", async (req, res) => res.renderer.render("elf-nihongo/index"));

module.exports = router;
