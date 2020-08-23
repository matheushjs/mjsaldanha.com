const express  = require("express");
const fs = require("fs");
var router = new express.Router();

router.get("/", async (req, res) => {
  let files = fs.readdirSync("public/images/artistic/").filter(value => !value.endsWith(".json"));

  let items = files.map(value => Object({
    link: ("/artistic/" + value),
    title: value
  }));

  res.renderer.postList(items, "Image Gallery");
});

router.get("/:filename", async (req, res) => {
  let filename = req.params.filename;

  const tempData = {
    "mackey-glass-attractor.gif": {
      "title": "Mackey Glass Attractor",
      "description": "<a href='//en.wikipedia.org/wiki/Mackey-Glass_equations' target='_blank'>Mackey-Glass Attractor</a> for different values of the parameter tau."
    },
    "arnold-tongue-rotation-number.jpg": {
      "title": "Rotation Number for the Circle Map",
      "description": "<a href='//en.wikipedia.org/wiki/Arnold_tongue' target='_blank'>Rotation number</a> for the circle map for various values of its two parameters K and Omega. The legend to the right represents the rotation number obtained. The y-axis is the parameter K in [0, 2pi], and the x-axis is Omega in [0, 1]."
    }
  };

  res.renderer.imageDisplay(filename, tempData[filename]["title"], tempData[filename]["description"]);
});

module.exports = router;
