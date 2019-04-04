function setFailMessage(str){
  $("form .fail-msg").text(str);
  $("form .alert").css("display", "");
}

function clearErrors(){
  $("form input").removeClass("is-invalid").removeClass("is-valid");
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

window.onload = function(){
  $("form input[name='username']").focus();
}