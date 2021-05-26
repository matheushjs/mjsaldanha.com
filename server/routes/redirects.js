var express = require("express");
var router = new express.Router();

router.get("/iscc2021/", async (req, res) => res.redirect("/articles/3-probability-distribution-of-execution-times"));

module.exports = router;
