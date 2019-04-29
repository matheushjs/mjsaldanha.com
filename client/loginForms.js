/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has javascript related to the forms for user login, signup etc.
 *
 * @class Client::loginForms.js
 */

"use strict";

function formFailMsg(){
  return $("form .fail-msg");
}
function formAlert(){
  return $("form .alert");
}
function formAllInputs(){
  return $("form input");
}
function formUsername(){
  return $("form input[name='username']");
}
function formCallname(){
  return $("form input[name='callname']");
}
function formPassword(){
  return $("form input[name='password']");
}
function formPassword2(){
  return $("form input[name='password2']");
}
function formCurPassword(){
  return $("form input[name='cur_password']");
}

function appendFailMsg(str){
  var msg = formFailMsg();

  msg.text(msg.text() + " " + str);
  formAlert().css("display", "");
}

function clearErrors(){
  formFailMsg().text("");
  formAlert().css("display", "none");
  formAllInputs().removeClass("is-invalid").removeClass("is-valid");
}

/**
 * Validates the value in the given form element.
 * If it is invalid, we add "is-invalid" class to it, to highlight it in red.
 *
 * @param {JQuery} $formElem Element to validate.
 * @param {String} elemName Name of what is being validated (Name, Password, etc).
 * @param {Boolean} checkWhitespace True if we should check if the field has trailing/leading whitespace.
 * @param {Boolean} checkLength True if we should check if the field has length between 1 and 128.
 * @return {Boolean} True if value is valid.
 * @method validateName
 */
function validateName($formElem, elemName, checkWhitespace, checkLength){
  var value = $formElem.val();
  var retVal = true;

  // Check t/l whitespace
  if(checkWhitespace && value.trim().length !== value.length){
    appendFailMsg(elemName + " cannot contain trailing/leading whitespaces.");
    $formElem.addClass("is-invalid");
    retVal = false;
  }

  // Check if has 1-128 characters
  if(checkLength && (value.length <= 0 || value.length > 128)){
    appendFailMsg(elemName + " must have at least 1 and at most 128 characters.");
    $formElem.addClass("is-invalid");
    retVal = false;
  }

  if(retVal === true){
    $formElem.addClass("is-valid");
  }

  return retVal;
}

function validateCallname(){
  var elem = formCallname();
  elem.val(elem.val().trim());
  return validateName(elem, "Name", false, true);
}

function validateUsername(){
  var elem = formUsername();
  return validateName(elem, "Username", true, true);
}

function validateCurPassword(){
  var elem = formCurPassword();
  return validateName(elem, "Current password", true, true);
}

function validatePassword(){
  var elem = formPassword();
  return validateName(elem, "Password", true, true);
}

function validatePassword2(){
  var elem1 = formPassword();
  var elem2 = formPassword2();

  if(elem2.val() !== elem1.val()){
    appendFailMsg("Passwords are not equal.");
    elem2.addClass("is-invalid");
    return false;
  }

  elem2.addClass("is-valid");
  return true;
}

var gModal = null;
function loadingModal(toggle){
  if(toggle){
    var body = $("body");
    var div = $("<div></div>");
    div.css({
      "position": "fixed",
      "top": "0px",
      "bottom": "0px",
      "left": "0px",
      "right": "0px",
      "display": "block",
      "background": "#0007",
      "z-index": "1050"
    });

    var inner = $("<div></div>");
    inner.append("<span class='spinner-border'></span>");
    inner.append("<h3 class='mx-auto' style='display: block;'>Please, wait a moment.</h3>");
    inner.css({
      "min-height": "20vh",
      "top": "40vh",
      "position": "relative",
      "background": "#ffff",
      "margin": "auto",
      "padding-top": "30px",
      "padding-bottom": "30px",
    });
    inner.addClass("border");
    inner.addClass("rounded");
    inner.addClass("text-center");
    inner.addClass("container");

    div.append(inner);
    body.append(div);
    gModal = div;
  } else if(gModal !== null){
    gModal.remove();
    gModal = null;
  }
}

/* exported validateLogin */
function validateLogin(){
  clearErrors();

  var failures = 0;

  failures += !validateUsername();
  failures += !validatePassword();

  if(failures === 0){
    loadingModal(true);

    var username = formUsername().val();
    var password = formPassword().val();

    $.ajax({
      url: "/model/login",
      data: {
        username,
        password
      },
      type: "POST",
      dataType: "json",
    })
    .done(function(json){
      if(json.success){
        window.location.replace("/");
      } else {
        appendFailMsg(json.errorTxt);
      }
    })
    .fail(function(xhr, status, err){
      appendFailMsg("Something went wrong in the server. I am really sorry for that. Please try again later.");
      appendFailMsg("Server error: " + err);
    })
    .always(function(){
      loadingModal(false);
    });
  }

  return false;
}

/* exported validateSignup */
function validateSignup(){
  clearErrors();

  var failures = 0;

  failures += !validateCallname();
  failures += !validateUsername();
  failures += !validatePassword();
  failures += !validatePassword2();

  if(failures === 0){
    var username = formUsername().val();
    var callname = formCallname().val();
    var password = formPassword().val();
    var password2 = formPassword2().val();
    var recaptcha;

    loadingModal(true);

    try {
      recaptcha = grecaptcha.getResponse();
    } catch(err){
      appendFailMsg("Something went wrong with Google ReCaptcha. I am sorry for this. Please try signing up later.");
      appendFailMsg("Error text: " + err);
      loadingModal(false);
      return false;
    }

    if(recaptcha === ""){
      appendFailMsg("Please click the ReCaptcha box.");
      loadingModal(false);
      return false;
    }

    $.ajax({
      url: "/model/signup",
      data: {
        username,
        callname,
        password,
        password2,
        recaptcha
      },
      type: "POST",
      dataType: "json",
    })
    .done(function(json){
      if(json.success){
        window.location.replace("/");
      } else {
        appendFailMsg(json.errorTxt);
        grecaptcha.reset();
      }
    })
    .fail(function(xhr, status, err){
      appendFailMsg("Something went wrong in the server. I am really sorry for that. Please try again later.");
      appendFailMsg("Server error: " + err);
    })
    .always(function(){
      loadingModal(false);
    });
  }

  return false;
}

/* exported validateAccount */
function validateAccount(){
  clearErrors();

  var callname = formCallname().val();
  var curpwd = formCurPassword().val();
  var pwd = formPassword().val();
  var pwd2 = formPassword2().val();

  // For callname, we ensure it has at least 1 character and less than 128
  if(!validateCallname()){
    return false;
  }

  // If user didn't touch password fields, we end validation here.
  if(curpwd === "" && pwd === "" && pwd2 === ""){
    loadingModal(true);
    $.ajax({
      url: "/model/account",
      data: { callname },
      type: "POST",
      dataType: "json",
    })
    .done(function(json){
      if(json.success){
        appendFailMsg("Your changes have been recorded!");
      } else {
        appendFailMsg(json.errorTxt);
      }
    })
    .fail(function(xhr, status, err){
      appendFailMsg("Something went wrong in the server. I am really sorry for that. Please try again later.");
      appendFailMsg("Server error: " + err);
    })
    .always(function(){
      loadingModal(false);
    });
    return false;
  }

  var failures = 0;

  failures += !validateCurPassword();
  failures += !validatePassword();
  failures += !validatePassword2();

  if(failures === 0){
    loadingModal(true);
    $.ajax({
      url: "/model/account",
      data: {
        callname,
        cur_password: curpwd,
        password: pwd,
        password2: pwd2
      },
      type: "POST",
      dataType: "json",
    })
    .done(function(json){
      if(json.success){
        appendFailMsg("Your changes have been recorded!");
      } else {
        appendFailMsg(json.errorTxt);
      }
    })
    .fail(function(xhr, status, err){
      appendFailMsg("Something went wrong in the server. I am really sorry for that. Please try again later.");
      appendFailMsg("Server error: " + err);
    })
    .always(function(){
      loadingModal(false);
    });
  }

  return false;
}

/* exported accountOnFocus */
function accountOnFocus(){
  formCurPassword().css("background-color", "");
  formPassword().prop("disabled", false);
  formPassword2().prop("disabled", false);
}

$(document).ready(function(){
  formAllInputs().first().focus();
});

export default {
  validateLogin,
  validateSignup,
  validateAccount,
  accountOnFocus
};
