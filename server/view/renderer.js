
/**
 * Our website uses EJS template engine, which requires every webpage to be server by means of a
 *   call to `res.render(page, objects)`.
 *
 * `objects` is a JSON object that is used by the template itself; it can contain the name of the user,
 * or a message to be shown in the page, or some boolean control variables. It can be bothersome to
 * render pages having to remember what objects are required to render each of them.
 *
 * The Render thus comes for easing the process of rendering, by encapsulating all data needed for
 * rendering pages, and providing some specialized render functions that accept arguments for changing
 * the rendered page.
 *
 * @class View::Renderer
 * @constructor
 * @param {String} [callname = null] Name by which we should call the user.
 * @param {Boolean} [specialUser = false] Whether the user has a special page or not.
 * @param {String} [language = "en"] The language in which to serve the page.
 * @param {Object} [translations = null] Object containing translation strings for the language in which to
 */
class Renderer {
  constructor(callname = null, specialUser = false, language = "en", translations = null){
    this.callname = callname;
    this.specialUser = specialUser;
    this.language = language;
    this.translations = translations;
  }

  messagePage(res, message){
    res.render("message_page", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
      message,
    });
  }

  account(res){
    res.render("account", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
    });
  }

  login(res, failMsg = null){
    res.render("login", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
      failMsg,
    });
  }

  signup(res, failMsg = null){
    res.render("signup", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
      failMsg,
    });
  }

  secret(res, visitors = -1){
    res.render("secret/index", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
      visitors,
    });
  }

  allUsers(res, users){
    res.render("secret/all_users", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
      users,
    });
  }

  render(res, pageName){
    res.render(pageName, {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      trans: this.translations,
    });
  }
}

module.exports = {
  Renderer,
};
