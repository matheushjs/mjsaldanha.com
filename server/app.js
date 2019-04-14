/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This sets up the express server, both HTTP and HTTPS, and adds all due midwares.
 *
 * Each method describes a midware used within the server.
 *
 * @class App::app.js
 */

const path = require("path");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const morgan = require("morgan");
const express = require("express");
const https = require("https");
const fs = require("fs");
const helmet = require("helmet");
const compression = require("compression");
const uglifyEs = require("uglify-es");
const minify = require("express-minify");

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
const modelRoutes       = require("./model/db_routes");

/**
 * Sets up EJS templating.
 *
 * Templates are taken from the directory `/server/view/pages/`.
 *
 * The method **`res.render`** is added, allowing us to, for example, use `res.render("page")`.
 *
 * @method midware-EJS
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view/pages"));
// app.set('view options', {debug: true});

/**
 * Sets logging for debugging & control.
 *
 * We do not log requests to `/myip`.
 *
 * @method midware-morgan
 */
app.use(morgan(":date[clf] :remote-addr :method :status :response-time ms - :url :res[content-length]", {
  skip: (req, res) => {
    var skipThis = {
      "/myip": 1,
    };
    return skipThis[req.path] ? true : false;
  }
}));

/**
 * Sets up body parsing, accepting the `application/json` and `application/x-www-form-urlencoded`
 * content types (respectively, JSON and URL encoded contents).
 *
 * This adds the object **`req.body`** containing data in the body of the POST request.
 *
 * @method midware-bodyParser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Sets up HSTS (HTTP Strict Transport Security).
 * If the user accesses our pages using HTTP, we ask the browser to
 *   redirect them to HTTPS in future requests.
 * Drawback: if we ever stop serving HTTPS, the browsers won't allow the user
 *   to access the HTTP version.
 *
 * @method midware-helmet
 */
if(process.env.NODE_ENV === "production"){
  app.use(helmet());
}

/**
 * Compresses the HTTP responses.
 * We don't compress some file formats because they are already compressed, and further compression results in
 *   a waste of computational power or even an elongation of the data transferral time.
 *
 * @method midware-compression
 */
app.use(compression({
  filter: (req, res) => {
    var url = req.url;
    var exts = [".jpg", ".png"];

    for(var ext in exts){
      if(url.endsWith(ext))
        return false;
    }

    return compression.filter(req, res);
  }
}));

/**
 * Minifies files.
 *
 * This midware must come after `compression` and before `express.static`.
 *
 * @method midware-minify
 */
app.use(minify({
  cache: false,
  uglifyJsModule: uglifyEs,
  errorHandler: (err, callback) => {
    console.log(err);
    if(err.stage === "compile"){
      callback(err.error, JSON.stringify(err.error));
      return;
    }
    callback(err.error, err.body);
  },
  jsMatch: /javascript/,
  cssMatch: /css/, // Matches content-types containing 'css'
  jsonMatch: /json/,
}));

/**
 * Sets up cookie-based user sessions.
 *
 * This adds the object **`req.session`** in which an specific user's session data is stored.
 * New session data can be created by adding objects to this `req.session` object.
 *
 * The `name` parameter controls what object is created within `req`. Prefer "session".
 *
 * @method midware-cookieSession
 */
app.use(cookieSession({
  name: "session", // Controls what object is created in `req`
  secret: "私が嫌い物があれば、それは人類だと思う。",
  maxAge: 10 * 365 * 24 * 60 * 60 * 1000, // 10 years
}));

/**
 * Sets up static serving of the /public folder.
 *
 * @method midware-express-static
 */
app.use(express.static(path.resolve("./public"), {
  maxAge: 31557600000 // Enable caching
}));

/**
 * Handles user privilege variables contained within req.session.
 * This middleware must be added before makeRenderer.
 *
 * See also {{#crossLink "midware/makeSecret.js:method"}}{{/crossLink}}.
 *
 * @method midware-makeSecret
 */
app.use(makeSecret);

/**
 * Handles localization in `req.language` and `req.translation`.
 *
 * See also {{#crossLink "midware/localize.js-langDecider:method"}}{{/crossLink}}.
 * See also {{#crossLink "midware/localize.js-localeProvider:method"}}{{/crossLink}}.
 *
 * @method midware-localization
 */
app.use(localize.langDecider);
app.use(localize.localeProvider);

/**
 * Creates `req.renderer`.
 *
 * See also {{#crossLink "midware/makeRenderer.js:method"}}{{/crossLink}}.
 *
 * @method midware-makeRenderer
 */
app.use(makeRenderer);

/**
 * Handles visitor counting.
 *
 * See also {{#crossLink "midware/countVisitor.js:method"}}{{/crossLink}}.
 *
 * @method midware-countVisitor
 */
app.use(countVisitor);

// Set up routes
app.use("/secret", secretRoutes);
app.use("/user", userRoutes);
app.use("/", indexRoutes);
app.use("/sci-projects", sciProjectsRoutes);
app.use("/articles", articlesRoutes);
app.use("/model", modelRoutes);

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
