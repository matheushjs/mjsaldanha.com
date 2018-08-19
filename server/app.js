const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const express = require("express");

const app = express();

const makeSecret   = require("./midware/makeSecret");
const makeRenderer = require("./midware/makeRenderer");
const indexRoutes  = require("./routes/index");
const secretRoutes = require("./routes/secret");
const userRoutes   = require("./routes/user");

// Sets up ejs templating
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view/pages"));

app.use(morgan("dev"));     // Sets logging for debugging & control
app.use(bodyParser.json()); // Sets up JSON body parsing
app.use(bodyParser.urlencoded({ extended: false }));  // Sets up urlencoded body parsing
app.use(cookieSession({     // Sets up cookie-based session
  name: "session",
  secret: "私が嫌い物があれば、それは人類だと思う。",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));
app.use(express.static(path.resolve("./public"), { // Serve the public folder statically.
  maxAge: 31557600000 // Enable caching
}));

// makeSecret must come before makeRenderer
app.use(makeSecret);   // Handle user privilege variables in req.session
app.use(makeRenderer); // Creates and initializes a Renderer object

// Set up routes
app.use("/secret", secretRoutes);
app.use("/user", userRoutes);
app.use("/", indexRoutes);

// Handle page not found
app.get("*", (req, res) => {
  // 404: Not Found
  res.status(404);
  req.renderer.messagePage(res, "Sorry! The requested page doesn't seem to exist.");
});

// Handle errors
app.use((err, req, res, next) => {
  // 500: Internal Server Error
  res.status(500);
  req.renderer.messagePage(res, "Sorry, something went wrong in the server. The maintainer has been notified about this error.");
  console.log(err.stack);
});

// Begin serving
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on ${port}`);
