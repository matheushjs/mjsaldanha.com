const crypto = require('crypto');
const keyBytes = 16; // Size of the secret keys to be used with Hmac

var dummy_users = { }

function authenticate(user, pass){
  if(!dummy_users[user]) return false; // User does not exist
  
  const secret = dummy_users[user].substr(0, keyBytes*2);
  const hash = crypto.createHmac('sha256', secret).update(pass).digest('hex');

  if(dummy_users[user] === secret + hash)
    return true;
  else return false;
}

function lookup(user){
  return dummy_users[user] ? true : false;
}

function add_user(user, pass, name){
  const secret = crypto.randomBytes(keyBytes).toString('hex');
  const hash = crypto.createHmac('sha256', secret).update(pass).digest('hex');
  dummy_users[user] = secret + hash;
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