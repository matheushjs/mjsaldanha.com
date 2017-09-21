const express = require('express');
const path = require('path');

const app = express();

// Serves files in the given folder, as it was an absolute path.
// so /index.html leads to public/index.html
app.use(express.static(path.join(__dirname, 'public')));

// Begin serving
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);
