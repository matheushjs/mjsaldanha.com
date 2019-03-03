
/**
 * This file has middlewares related to localization.
 *
 * For now, we store all translations in a YAML file under `/server/view/locale`.
 * Such YAML file is parsed an translation strings for each language are stored in a global
 * variable. In the future, we should add some sort of caching for such strings.
 *
 * @class Midware::localize.js
 */


const yaml = require("js-yaml");
const fs   = require("fs");

// read YAML file
const jsonStrings = yaml.load(fs.readFileSync("./server/view/locale/all.yml", "utf8"));

// Will globally hold the translation strings
var langStrings = null;

/**
 * Sets up the language in which to serve the website.
 * We don't use just cookies because of google crawlers.
 *
 * So the rules are:
 *   1. If the URL is something like 'mjsaldanha.com/jp/...', we use it to define
 *        the language. Normally, only the index page will be accessed like this.
 *   2. If we have session.lang, we use it to determine the language
 *   3. Else, serve english
 *
 * The language will be stored in "req.language", using codes defined in ISO 639-1.
 *
 * **Depends on**:
 * - `req.session.language`: we first look into this cookie to see if the user already has a
 *     preferred language.
 *
 * **Generates**:
 * - `req.language`: the language in which we should serve the website.
 *
 * @method langDecider
 * @param req
 * @param res
 * @param next
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

/* Recursive function for filtering language strings off a JSON object.
 * 'src' will likely be something like
 *   { home: {
 *       title: {
 *         en: "title",
 *         ja: "タイトル",
 *   } } }
 * and we want to remove these objects that represents languages, "en" and "ja", like:
 *   { home: {
 *       title: "title"
 *   } }
 * The result is stored in 'dest'.
 */
function filter_language(dest, src, lang){
  for(var property in src){
    if(typeof src[property] === "object"){
      if("en" in src[property]){
        dest[property] = src[property][lang];
      } else {
        dest[property] = {};
        filter_language(dest[property], src[property], lang);
      }
    } else {
      dest[property] = src[property];
    }
  }
}

/* 
 */
/**
 * Based on req.language, fill req.translations with due translation strings.
 *
 * **Depends on**:
 * - `req.language`: To check in which language we should produce translation strings.
 *
 * **Generates**:
 * - `req.translations`: Contains the translation strings, in a way that closely reflects the
 *     YAML structure.
 *
 * @method localeProvider
 * @param req
 * @param res
 * @param next
 */
function localeProvider(req, res, next) {
  if(!req.language){
    console.log("localeProvider has been called, but req.language is not defined!");
    req.language = "en";
  }

  if(langStrings === null){
    langStrings = {
      en: {},
      ja: {}
    };
    filter_language(langStrings.en, jsonStrings, "en");
    filter_language(langStrings.ja, jsonStrings, "ja");
  }

  req.translations = langStrings[req.language];

  next();
}

module.exports = {
  langDecider,
  localeProvider,
};
