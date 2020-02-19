var express = require("express");
var router = new express.Router();

router.get("/",                 async (req, res) => res.renderer.render("sci-projects/index"));
router.get("/1-psp-project-1/", async (req, res) => res.renderer.render("sci-projects/1-psp-project-1/index"));
router.get("/2-accel-nns-1/",    async (req, res) => res.renderer.render("sci-projects/2-accel-nns-1/index"));
router.get("/3-prob-exec-times-1/",    async (req, res) => res.renderer.render("sci-projects/3-prob-exec-times-1/index"));
router.get("/4-chaotic-slt-1/",    async (req, res) => res.renderer.render("sci-projects/4-chaotic-slt-1/index"));

module.exports = router;
