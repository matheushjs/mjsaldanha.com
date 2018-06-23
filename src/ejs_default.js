var express = require("express");
var path = require("path");

/* Default EJS file rendering, that passes req.session to the rendering engine.
 * The function will look at the requested URL. If it doesn't have extension or it
 *   has .ejs extension, we try to render the file as EJS.
 * The file to be rendered is searched in "prefixDir" + req.originalUrl. So if
 *   "prefixDir" is "pages" and the URL is /index, we try to render pages/index.ejs.
 * If it fails to render, we go next().
 */
function create(prefixDir){
  var router = express.Router();

  router.use(function(req, res, next) {
    var info = path.parse(req.originalUrl);
    var renderUrl = "" + req.originalUrl;

    // Strip initial "/" if prefixDir is blank
    if(!prefixDir && renderUrl[0] === "/"){
      renderUrl = renderUrl.slice(1);
    }

    // If URL isn't any of the following extensions
    if(["", ".ejs"].indexOf(info.ext) === -1){
      return next();
    }

    // If requested path is a directory, serve the index.ejs
    if(req.originalUrl.slice(-1) === "/"){
      renderUrl += "index.ejs";
    // If extension is blank, assume it is .ejs
    } else if(info.ext === "") {
      renderUrl += ".ejs";
    }

    // Try to serve the file, else next()
    res.render(path.join(prefixDir, renderUrl), {session: req.session}, function(err, html){
      if(err){
        return next();
      } else {
        res.send(html);
      }
    });
  });

  return router;
}

module.exports = {
  create,
};
