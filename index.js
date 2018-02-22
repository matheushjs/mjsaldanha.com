const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// Sets up ejs templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'client'));

// Sets up body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up session handling
app.use(session({
  secret: "私が嫌い物があれば、それは人類だと思う。",
  resave: false,
  saveUninitialized: false,
}));

/*
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
*/

// Set up routes
app.use('/', require('./src/root_routes'));

// Set for serving static files (must come after setting up our routes)
app.use(express.static(path.join(__dirname, 'client')));

// Set up failsafe (must come after all other routes)
app.get("*", (req, res) => {
  res.render("pages/message_page", {
    message: "Sorry! The requested page doesn't seem to exist.",
    session: req.session,
  });
});

// Begin serving
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);
