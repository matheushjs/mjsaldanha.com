
const yaml = require("js-yaml");
const fs   = require("fs");

/* Sets up the language in which to serve the website.
 * We don't use just cookies because of google crawlers.
 * So the rules are:
 *   1) If the URL is something like 'mjsaldanha.com/jp/...', we use it to define
 *        the language. Normally, only the index page will be accessed like this.
 *   2) If we have session.lang, we use it to determine the language
 *   3) Else, serve english
 * The language will be stored in "req.language", using codes defined in ISO 639-1.
 */
function langDecider(req, res, next) {
  let urlTokens = req.path.split("/");
  let langToken = urlTokens[1];     // Language given as directory in the URL
  let cookieLang = req.session.language;  // Language taken from the cookie

  // Check if we have the language directory in the URL
  if(langToken === "en"){
    req.language = "en";
  } else if(langToken === "ja"){
    req.language = "ja";

  // Now check language given in cookies
  } else if (cookieLang === "en"){
    req.language = "en";
  } else if (cookieLang === "ja"){
    req.language = "ja";

  // Default: serve in english
  } else {
    req.language = "en";
  }

  // We then update the user's cookie
  req.session.language = req.language;

  next();
};

/* Based on req.language, fill req.translation with due translation strings.
 */
function localeProvider(req, res, next) {
  if(!req.language){
    console.log("localeProvider has been called, but req.language is not defined!");
    req.language = "en";
  }

  // read YAML file
  var doc = yaml.load(fs.readFileSync("./server/view/locale/index.yml", "utf8"));
  //console.log(doc);

  next();
}

module.exports = {
  langDecider,
  localeProvider,
};