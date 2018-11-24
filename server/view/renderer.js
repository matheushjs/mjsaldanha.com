
class Renderer {
  constructor(callname = null, specialUser = false, language = "en"){
    this.callname = callname;
    this.specialUser = specialUser;
    this.language = language;
  }
  
  messagePage(res, message){
    res.render("message_page", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      message,
    });
  }

  account(res){
    res.render("account", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
    });
  }

  login(res, failMsg = null){
    res.render("login", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      failMsg,
    });
  }

  signup(res, failMsg = null){
    res.render("signup", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      failMsg,
    });
  }

  allUsers(res, users){
    res.render("secret/all_users", {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
      users,
    });
  }

  render(res, pageName){
    res.render(pageName, {
      callname: this.callname,
      specialUser: this.specialUser,
      lang: this.language,
    });
  }
}

module.exports = {
  Renderer,
};