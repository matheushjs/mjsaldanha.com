const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = require("express")();

// Sets up ejs templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view/pages"));

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
  return next();
});
*/

// Set up routes
app.use("/", require("./control/root_routes"));

// Set up error handling
app.use((err, req, res, next) => {
  res.render("message_page", {
    session: req.session,
    message: "Sorry, something went wrong in the server. The maintainer has been notified about this error.",
  });
  console.log(err.stack);
});

// Begin serving
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);
