const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

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
app.all("*", (req, res, next) => {
  console.log('\n' + req.originalUrl);
  console.log(req.session);
  console.log(JSON.stringify(req.body, null, 2));
  next();
})

// Set up session handling
app.use(session({
  secret: "私が嫌い物があれば、それは人類だと思う。",
  resave: false,
  saveUninitialized: false,
}));

// Set up routes
app.use('/', require('./src/root_routes'));

// Begin serving
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);
