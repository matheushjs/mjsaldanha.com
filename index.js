const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Sets up ejs templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client'));

// Set source directories for serving
app.use(express.static(path.join(__dirname, 'client')));
app.use("/blog", express.static(path.join(__dirname, 'client/hexo_blog/public')))

// Sets up body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("*", (req, res, next) => {
  console.log('\n' + req.originalUrl);
  console.log(JSON.stringify(req.body, null, 2));
  next();
})

// Set up routes
app.use('/', require('./src/root_routes'));

// Begin serving
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);
