/**
 * This file provides functions for interacting with the database, where user information and
 * user authentication are concerned.
 *
 * - No leading/trailing whitespace is to be allowed in usernames, passwords, callnames etc,
 *   because the db fills these fields with whitespace, so we remove all whitespace from all
 *   strings retrieved from the database.
 *
 * Table schema:
 *
 * ```
 * CREATE TABLE users(username CHAR(128) NOT NULL, password CHAR(96) NOT NULL, callname CHAR(128))```
 *
 * @class Model::db_users.js
 */


const crypto = require("crypto");
const keyBytes = 16; // Size of the secret keys to be used with Hmac
const client = require("./db_client");


/**
 * User object to represent a user in memory.
 *
 * "hashpass" receives the hash value stored in the database for the password.
 *
 * The User object is defined as:
 *
 * `User = { id, username, hashpass, callname }`
 *
 * @method User
 * @param {Number-like} id The unique ID of the user.
 * @param {String} username Username of the user.
 * @param {String} hashpass The hash of the user password.
 * @param {String} callname The name by which we should call the user.
 * @return {Object} A User object.
 */
function User(id, username, hashpass, callname){
  this.id = Number(id);
  this.username = username;
  this.hashpass = hashpass;
  this.callname = callname;
}

/**
 * Queries the database for an user.
 *
 * The argument should be an object with only 1 of the following attributes:
 * - username: for looking up an user by their username
 * - id: for looking up an user by their id
 *
 * @method lookup
 * @param {Object} obj Object containing either a `username` or an `id`.
 * @return {User} Filled User object, if the user is found; null, otherwise.
 * @async
 * @example
 *     var user = await lookup({username: "walwal"});
 *     if(user){
 *       console.log(user.callname);
 *     }
 */
async function lookup(obj){
  var query = "SELECT rowid, * FROM users WHERE ";
  const queryUsername = "username = ?";
  const queryRowid = "rowid = ?";
  var arg;

  if(obj.username){
    query += queryUsername;
    arg = obj.username;
  } else if(obj.id){
    query += queryRowid;
    arg = obj.id;
  } else {
    console.log("Object given as argument doesn't have recognizable attributes.");
    return null;
  }

  try {
    var rows = await client.all(query, [arg]);
    var user = rows[0];

    if(!user){
      return null;
    } else {
      // Remove whitespace
      user.username = user.username.replace(/^ */g, "").replace(/ *$/g, "");
      user.password = user.password.replace(/^ */g, "").replace(/ *$/g, "");
      user.callname = user.callname.replace(/^ */g, "").replace(/ *$/g, "");

      return new User(user.rowid, user.username, user.password, user.callname);
    }
  } catch(e) {
    console.log(e);
  }

  return null;
}

/**
 * Attempts to authenticate user with username "user" and textual password "pass".
 *
 * @method authenticate
 * @param {String} user Username of the user.
 * @param {String} pass Password of the user, in its textual (non-hashed) form.
 * @return {User} Filled User object if authentication is successful, null otherwise.
 * @async
 * @example
 *     var user = await dbUsers.authenticate(req.session.username, req.body.cur_password);
 *     if(!user){
 *       res.send("Wrong current password!");
 *       return;
 *     }
 */
async function authenticate(user, pass){
  var recUser = await lookup({username: user});
  
  if(!recUser){
    return null;
  }

  const secret = recUser.hashpass.substr(0, keyBytes*2);
  const hash = crypto.createHmac("sha256", secret).update(pass).digest("hex");

  if(recUser.hashpass === secret + hash){
    return recUser;
  } else {
    return null;
  }
}

/**
 * Inserts a new user in the database, with username "user", password "pass" and call name "name".
 *
 * For each user, we generate a random string [secret]. Then we hash the user password using [secret]
 * as the salt, generating [hashpass]. We store in the database [secret][hashpass], so that the next
 * time someone attempts to log in to such user, we can retrieve the same [secret] we used as salt
 * here.
 *
 * @method addUser
 * @async
 * @private
 * @param {String} user Username of the user being signed up.
 * @param {String} pass Textual (non-hashed) password of the user being signed up.
 * @param {String} name Call name of the user, by which we should call them.
 * @return {User} Filled user object if user was added up successfully, null if database
 *                returned an error, which likely means an user with that username already
 *                exists.
 */
async function addUser(user, pass, name){
  const secret = crypto.randomBytes(keyBytes).toString("hex");
  const hash = crypto.createHmac("sha256", secret).update(pass).digest("hex");
  var stmt = client.prepare("INSERT INTO users(username, password, callname) VALUES (?, ?, ?)", [user, secret + hash, name]);

  try {
    await stmt.run();
    return await lookup({username: user});
  } catch(e) {
    console.log(e);
    return null;
  }
}

/**
 * Attempts to sign up a user.
 *
 * First, this function checks if a user with given username exists. If it already exists, nothing is done
 *   and the function returns null.
 * If the given "user" is available for usage, then we insert the new user in the database.
 *
 * @method signUp
 * @async
 * @param {String} user Username of the user being signed up.
 * @param {String} pass Textual (non-hashed) password of the user being signed up.
 * @param {String} name Call name of the user, by which we should call them.
 * @return {User} Filled user object if user was signed up successfully, null otherwise.
 * @example
 *     var authUser = await dbUsers.signUp(req.body.username, req.body.password, req.body.callname);
 *     if(!authUser){
 *       console.log("Username already exists. Please, pick another one.");
 *     }
 */
async function signUp(user, pass, name){
  var authUser = await addUser(user, pass, name);

  if(authUser){
    return new User(authUser.id, authUser.username, authUser.hashpass, authUser.callname);
  } else {
    return null;
  }
}

/**
 * Updates user information in the table for the given user.
 *
 * Here we require that the given user has `user.id`, which we will use
 *   to lookup the user in the database.
 *
 * We update callname and/or password, as long as they are provided as
 *   `user.callname` or `user.password`.
 *
 * Password should given in textual form, we encrypt it.
 * This function always returns the filled User object.
 * "user" should be an object with at least the following attributes:
 *   - id: the id of the user to update (mandatory)
 *   - callname: the new callname of the user (optional)
 *   - password: the new textual password of the user (optional)
 *
 * @method updateUser
 * @async
 * @param {Object} user Information about the user to be edited.
 * @param {Number} user.id Unique identified of the user to be edited.
 * @param {String} [user.callname] New callname of the user being edited.
 * @param {String} [user.password] New password of the user being edited.
 * @return {User} Filled user object with updated information about the user; null
 *   if user was not found in the database.
 * @example
 *     var user = await dbUsers.updateUser({id: req.session.userid, callname: req.body.callname});
 *     if(user){
 *         console.log("OK");
 *     }
 */
async function updateUser(user){
  if(!user.id){
    throw Error("user must have an id");
  }
  if(!user.callname && !user.password){
    return await lookup({id: user.id});
  }

  var retUser = await lookup(user);
  if(!retUser) return null;

  if(user.callname){
    retUser.callname = user.callname;
  }

  if(user.password){
    const secret = crypto.randomBytes(keyBytes).toString("hex");
    const hash = crypto.createHmac("sha256", secret).update(user.password).digest("hex");
    retUser.hashpass = secret + hash;
  }

  var stmt = client.prepare("UPDATE users SET callname = ?, password = ? WHERE rowid = ?", [retUser.callname, retUser.hashpass, retUser.id]);      
  try {
    await stmt.run();
    return retUser;
  } catch(e) {
    console.log(e);
    return null;
  }
}

/**
 * Gets all users stored within the database.
 *
 * @method allUsers
 * @async
 * @return {List} List of User objects, with all users in the database.
 * @example
 *     var users = await dbUsers.allUsers();
 */
async function allUsers(){
  var rows;
  try {
    rows = await client.all("SELECT rowid, * FROM users");
  } catch(e) {
    console.log(e);
    return [];
  }

  var users = [];
  for(var i = 0; i < rows.length; i++){
    var row = rows[i];

    // Remove whitespace
    row.username = row.username.replace(/^ */g, "").replace(/ *$/g, "");
    row.password = row.password.replace(/^ */g, "").replace(/ *$/g, "");
    row.callname = row.callname.replace(/^ */g, "").replace(/ *$/g, "");

    users.push(new User(row.rowid, row.username, row.password, row.callname));
  }
  return users;
}

module.exports = {
  authenticate,
  lookup,
  signUp,
  updateUser,
  allUsers,
};
