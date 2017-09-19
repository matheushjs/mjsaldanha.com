const express = require('express');
const path = require('path');

const app = express();

// Probably selects what directory contains static files that can be cached
app.use(express.static(__dirname));


app.get('*', (req, res) => {
  res.send("<h1>Hello World</h1>");
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);