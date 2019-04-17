/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has javascript related to the forms for user login, signup etc.
 *
 * @class Client::loginForms.js
 */

"use strict";

function appendFailMsg(str){
  var msg = $("form .fail-msg");

  msg.text(msg.text() + " " + str);
  $("form .alert").css("display", "");
}

function clearErrors(){
  $("form .fail-msg").text("");
  $("form .alert").css("display", "none");
  $("form input").removeClass("is-invalid").removeClass("is-valid");
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
  var elem = $("form input[name='callname']");
  elem.val(elem.val().trim());
  return validateName(elem, "Name", false, true);
}

function validateUsername(){
  var elem = $("form input[name='username']");
  return validateName(elem, "Username", true, true);
}

function validateCurPassword(){
  var elem = $("form input[name='cur_password']");
  return validateName(elem, "Current password", true, true);
}

function validatePassword(){
  var elem = $("form input[name='password']");
  return validateName(elem, "Password", true, true);
}

function validatePassword2(){
  var elem1 = $("form input[name='password']");
  var elem2 = $("form input[name='password2']");

  if(elem2.val() !== elem1.val()){
    appendFailMsg("Passwords are not equal.");
    elem2.addClass("is-invalid");
    return false;
  }

  elem2.addClass("is-valid");
  return true;
}

/* exported validateLogin */
function validateLogin(){
  clearErrors();

  var failures = 0;

  failures += !validateUsername();
  failures += !validatePassword();

  if(failures === 0){
    var username = $("form input[name='username']").val();
    var password = $("form input[name='password']").val();

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
    var username = $("form input[name='username']").val();
    var callname = $("form input[name='callname']").val();
    var password = $("form input[name='password']").val();
    var password2 = $("form input[name='password2']").val();
    var recaptcha;

    try {
      recaptcha = grecaptcha.getResponse();
    } catch(err){
      appendFailMsg("Something went wrong with Google ReCaptcha. I am sorry for this. Please try signing up later.");
      appendFailMsg("Error text: " + err);
      return false;
    }

    if(recaptcha === ""){
      appendFailMsg("Please click the ReCaptcha box.");
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
    });
  }

  return false;
}

/* exported validateAccount */
function validateAccount(){
  clearErrors();

  var callname = $("form input[name='callname']").val();
  var curpwd = $("form input[name='cur_password']").val();
  var pwd = $("form input[name='password']").val();
  var pwd2 = $("form input[name='password2']").val();

  // For callname, we ensure it has at least 1 character and less than 128
  if(!validateCallname()){
    return false;
  }

  // If user didn't touch password fields, we end validation here.
  if(curpwd === "" && pwd === "" && pwd2 === ""){
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
    });
    return false;
  }

  var failures = 0;

  failures += !validateCurPassword();
  failures += !validatePassword();
  failures += !validatePassword2();

  if(failures === 0){
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
    });
  }

  return false;
}

/* exported accountOnFocus */
function accountOnFocus(){
  $("form input[name='cur_password']").css("background-color", "");
  $("form input[name='password']").prop("disabled", false);
  $("form input[name='password2']").prop("disabled", false);
}

$(document).ready(function(){
  $("form input").first().focus();
});

export default {
  validateLogin,
  validateSignup,
  validateAccount,
  accountOnFocus
};