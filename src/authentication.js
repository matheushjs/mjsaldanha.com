
dummy_users = { }

function authenticate(user, pass){
  if(dummy_users[user] && dummy_users[user] === pass){
    return true;
  } else return false;
}

function lookup(user){
  return dummy_users[user] ? true : false;
}

function add_user(user, pass, name){
  dummy_users[user] = pass;
}

function sign_up(user, pass, name){
  if(lookup(user)) return false;
  add_user(user, pass, name);
  return true;
}

function print(){
  console.log(dummy_users);
}

module.exports = {
  authenticate: authenticate,
  lookup: lookup,
  add_user: add_user,
  sign_up: sign_up,
  print: print
}