/**
 * Sets up the express server, both HTTP and HTTPS, and adds all due midwares.
 *
 * We are currently using all the following modules and midwares, **in the order listed**:
 *
 * - **EJS**: adds the method `render` to the `res` objects, allowing us to `res.render("page")`
 *
 * - **morgan**: which logs information about requests and responses
 *
 * - **body-parser**: parses the body of an HTTP request, and stores it in `req.body`
 *
 * - **helmet**: adds HSTS, which enforces usage of HTTPS.
 *
 * - **cookie-session**: parses cookies of an HTTP request, and stores it in `req.session`
 *
 * - **express.static**: serves a folder statically (folder ./public)
 *
 * - **makeSecret**: handles user privileges, checking if they have special pages or not.
 *
 * @module app.js
 */

const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const express = require("express");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");

const app = express();

const makeSecret   = require("./midware/makeSecret");
const localize     = require("./midware/localize");
const makeRenderer = require("./midware/makeRenderer");
const countVisitor = require("./midware/countVisitor");
const indexRoutes  = require("./routes/index");
const secretRoutes = require("./routes/secret").router;
const userRoutes   = require("./routes/user");
const sciProjectsRoutes = require("./routes/sci-projects");
const articlesRoutes    = require("./routes/articles");

/**
 * Sets up EJS templating.
 *
 * Templates are taken from the directory `/server/view/pages/`.
 *
 * The method **`res.render`** is added, allowing us to, for example, use `res.render("page")`.
 *
 * @submodule midware-EJS
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view/pages"));

/**
 * Sets logging for debugging & control.
 *
 * @submodule midware-morgan
 */
app.use(morgan("dev"));

/**
 * Sets up body parsing, accepting the `application/json` and `application/x-www-form-urlencoded`
 * content types (respectively, JSON and URL encoded contents).
 *
 * This adds the object **`res.body`** containing data in the body of the POST request.
 *
 * @submodule midware-bodyParser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(helmet());
app.use(cookieSession({     // Sets up cookie-based session
  name: "session",
  secret: "私が嫌い物があれば、それは人類だと思う。",
  maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
}));
app.use(express.static(path.resolve("./public"), { // Serve the public folder statically.
  maxAge: 31557600000 // Enable caching
}));

// makeSecret must come before makeRenderer
app.use(makeSecret);              // Handle user privilege variables in req.session
app.use(localize.langDecider);    // Handles user language in req.language
app.use(localize.localeProvider); // Handles translations in req.translation
app.use(makeRenderer);            // Creates and initializes a Renderer object
app.use(countVisitor);            // Handles visitor counting

// Set up routes
app.use("/secret", secretRoutes);
app.use("/user", userRoutes);
app.use("/", indexRoutes);
app.use("/sci-projects", sciProjectsRoutes);
app.use("/articles", articlesRoutes);

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

// Serve HTTP
const port = process.env.PORT || 5000;
app.listen(port);

// Serve HTTPS
var sslPort;
try {
  sslPort = process.env.SSL_PORT || 5001;
  
  https.createServer({
    key: fs.readFileSync("server/ssl/key.pem"),
    cert: fs.readFileSync("server/ssl/cert.pem")
  }, app).listen(sslPort);
} catch(err) {
  if(err.code === "ENOENT"){
    console.log(`ERROR: File "${err.path}" was not found.`);
  } else {
    console.log(err);
  }
  
  sslPort = -1;
}

console.log(`Server listening on ${port} (HTTP) and ${sslPort} (HTTPS)`);
