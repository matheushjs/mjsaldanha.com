
/* Sets up the language in which to serve the website.
 * We don't use just cookies because of google crawlers.
 * So the rules are:
 *   1) If we have session.lang, we use it to determine the language
 *   2) If the URL is something like 'mjsaldanha.com/jp/...', we use it to define
 *        the language. Normally, only the index page will be accessed like this.
 * The language will be stored in "req.language", using codes defined in ISO 639-1.
 */
module.exports = (req, res, next) => {
  let lang = req.session.language;

  if(lang){ // If we have the cookie
    if(lang == "en"){
      req.language = "en";
    } else if (lang == "ja"){
      req.language = "ja";
    } else {
      req.language = "en";
    }
  } else {  // If we have the language directory in the URL
    let urlTokens = req.path.split("/");
    let langToken = urlTokens[1];
    if(langToken == "ja"){
      req.language = "ja";
    } else {
      req.language = "en";
    }
  }

  // We then update the user's cookie
  req.session.language = req.language;

  next();
};