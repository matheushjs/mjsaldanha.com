/* Authentication module
 * 
 * - No whitespace is to be allowed in usernames, passwords, callnames etc, because postgre fills
 *   these fields with whitespace, so we remove all whitespace from all strings retrieved from the
 *   database.
 * 
 * - Since the pg module offers only functions that return Promises, we also implement functions
 *   using this pattern.
 */


const crypto = require('crypto');
const keyBytes = 16; // Size of the secret keys to be used with Hmac

const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  password: "password",
});

client.connect();

// Table schemas
// client.query("CREATE TABLE users(username CHAR(128) PRIMARY KEY NOT NULL, password CHAR(96) NOT NULL, callname CHAR(128))");

/* User object to represent a user in memory.
 * 'hashpass' receives the hash value stored in the database for the password.
 */
function User(username, hashpass, callname){
  this.username = username;
  this.hashpass = hashpass;
  this.callname = callname;
}

/* Queries the database for user with username 'user'.
 * Returns undefined if user was not found.
 * Returns filled User object if found.
 */
function lookup(user){
  return client.query("SELECT * FROM users WHERE username = $1", [user])
    .then(res => {
      if(!res.rows[0]) return undefined;
      else {
        // Remove whitespace
        res.rows[0].username = res.rows[0].username.replace(/ /g, '');
        res.rows[0].password = res.rows[0].password.replace(/ /g, '');
        res.rows[0].callname = res.rows[0].callname.replace(/ /g, '');

        return new User(res.rows[0].username, res.rows[0].password, res.rows[0].callname);
      }
    })
}

/* Attempts to authenticate user with username 'user' and textual password 'pass'.
 * If authentication fails, returns undefined.
 * If it succeeds, returns a filled User object.
 */
function authenticate(user, pass){
  return lookup(user)
    .then(recUser => {
      if(!recUser) return undefined;

      const secret = recUser.hashpass.substr(0, keyBytes*2);
      const hash = crypto.createHmac('sha256', secret).update(pass).digest('hex');

      if(recUser.hashpass === secret + hash){
        return recUser;
      } else {
        return undefined;
      }
    })
}

/* Inserts a new user in the database, with username 'user', password 'pass' and call name 'name'.
 * This function does not check whether the user already exists or not. The caller must make this check.
 */
function add_user(user, pass, name){
  // TODO: Validation of input here or on root_routes
  const secret = crypto.randomBytes(keyBytes).toString('hex');
  const hash = crypto.createHmac('sha256', secret).update(pass).digest('hex');
  return client.query("INSERT INTO users(username, password, callname) VALUES ($1, $2, $3)", [user, secret + hash, name]);
}

/* Attempts to sign up a user with username 'user', password 'pass' and callname 'name.'
 * First, this function checks if a user with given username exists. If it already exists, nothing is done
 *   and the function returns undefined.
 * If the given 'user' is available for usage, then we insert the new user in the database. Function returns
 *   a filled User in this case.
 */
function sign_up(user, pass, name){
  return lookup(user)
    .then(found => {
      if(found){
        return undefined;
      } else {
        return add_user(user, pass, name).then(() => { return new User(user, pass, name); });
      }
    })
}

module.exports = {
  authenticate: authenticate,
  lookup: lookup,
  sign_up: sign_up,
}