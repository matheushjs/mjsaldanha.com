function setFailMessage(str){
  var msg = $("form .fail-msg");

  msg.text(msg.text() + " " + str);
  $("form .alert").css("display", "");
}

function clearErrors(){
  $("form .fail-msg").text("");
  $("form .alert").css("display", "none");
  $("form input").removeClass("is-invalid").removeClass("is-valid");
}

function validateCallname(){
  var elem = $("form input[name='callname']");
  var callname = elem.val().trim();

  // For username, we ensure it doesn't have t/l whitespace and has 1-128 characters
  if(callname.length <= 0 || callname.length > 128){
    setFailMessage("Name must have at least 1 and at most 128 characters.");
    elem.addClass("is-invalid");
    return false;
  }

  elem.addClass("is-valid");
  return true;
}

function validateUsername(){
  var elem = $("form input[name='username']");
  var username = elem.val();

  // For username, we ensure it doesn't have t/l whitespace and has 1-128 characters
  if(username.trim().length !== username.length){
    setFailMessage("Username cannot contain trailing/leading whitespaces.");
    elem.addClass("is-invalid");
    return false;
  } else if(username.length <= 0 || username.length > 128){
    setFailMessage("Username must have at least 1 and at most 128 characters.");
    elem.addClass("is-invalid");
    return false;
  }

  elem.addClass("is-valid");
  return true;
}

function validateCurPassword(){
  var elem = $("form input[name='cur_password']");
  var pwd = elem.val();
  
  // For pwd, we ensure it doesn't have t/l whitespace and has 1-128 characters too
  if(pwd.trim().length !== pwd.length){
    setFailMessage("Current password cannot contain trailing/leading whitespaces.");
    elem.addClass("is-invalid");
    return false;
  } 
  if(pwd.length <= 0 || pwd.length > 128){
    setFailMessage("Current password must have at least 1 and at most 128 characters.");
    elem.addClass("is-invalid");
    return false;
  }

  elem.addClass("is-valid");
  return true;
}

function validatePassword(){
  var elem = $("form input[name='password']");
  var pwd = elem.val();
  
  // For pwd, we ensure it doesn't have t/l whitespace and has 1-128 characters too
  if(pwd.trim().length !== pwd.length){
    setFailMessage("Password cannot contain trailing/leading whitespaces.");
    elem.addClass("is-invalid");
    return false;
  } 
  if(pwd.length <= 0 || pwd.length > 128){
    setFailMessage("Password must have at least 1 and at most 128 characters.");
    elem.addClass("is-invalid");
    return false;
  }

  elem.addClass("is-valid");
  return true;
}

function validateLogin(){
  clearErrors();

  var failures = 0;

  failures += !validateUsername();
  failures += !validatePassword();

  if(failures == 0){
    return true;
  } else {
    return false;
  }
}

function validatePassword2(){
  var elem1 = $("form input[name='password']");
  var elem2 = $("form input[name='password2']");

  if(elem2.val() !== elem1.val()){
    setFailMessage("Passwords are not equal.");
    elem2.addClass("is-invalid");
    return false;
  }

  elem2.addClass("is-valid");
  return true;
}

function validateSignup(){
  clearErrors();

  var failures = 0;
  
  failures += !validateCallname();
  failures += !validateUsername();
  failures += !validatePassword();
  failures += !validatePassword2();

  if(failures == 0){
    return true;
  } else {
    return false;
  }
}

/** Currently only used in account/ . */
function sendForm(data) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4){
      if(this.responseText != ''){
        setFailMessage(this.responseText);
      } else {
        setFailMessage("Your changes have been recorded!");
      }
    }
  };
  xhttp.open("POST", "/user/account", true);
  xhttp.setRequestHeader('Content-type', 'application/json');
  xhttp.send(JSON.stringify(data));
}

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
    sendForm({
      callname: callname,
    })
    return false;
  }

  var failures = 0;
  
  failures += !validateCurPassword();
  failures += !validatePassword();
  failures += !validatePassword2();

  if(failures == 0){
    sendForm({
      callname: callname,
      cur_password: curpwd,
      password: pwd,
      password2: pwd2
    });
  }

  /** Always return false because we are using AJAX here. */
  return false;
}

function accountOnFocus(){
  $("form input[name='cur_password']").css("background-color", "");
  $("form input[name='password']").prop("disabled", false);
  $("form input[name='password2']").prop("disabled", false);
}

$(document).ready(function(){
  $("form input").first().focus();
});