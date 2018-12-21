
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
    })
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