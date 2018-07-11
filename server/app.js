const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const morgan = require("morgan");

const app = require("express")();

const indexRoutes = require("./routes/index");

// Sets up ejs templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view/pages"));

app.use(morgan('dev'));     // Sets logging for debugging & control
app.use(bodyParser.json()); // Sets up JSON body parsing
app.use(bodyParser.urlencoded({ extended: false })); // Sets up urlencoded body parsing
app.use(cookieSession({     // Sets up cookie-based session
  name: "session",
  secret: "私が嫌い物があれば、それは人類だと思う。",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

/*
app.use((req, res, next) => {
  console.log(req.url);
  return next();
});
*/

// Set up routes
app.use("/", indexRoutes);

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
