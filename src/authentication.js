/* Authentication module
 * 
 * - No leading/trailing whitespace is to be allowed in usernames, passwords, callnames etc,
 *   because postgre fills these fields with whitespace, so we remove all whitespace from all
 *   strings retrieved from the database.
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
// client.query("CREATE TABLE users(id BIGSERIAL PRIMARY KEY, username CHAR(128) NOT NULL, password CHAR(96) NOT NULL, callname CHAR(128))");

/* User object to represent a user in memory.
 * 'hashpass' receives the hash value stored in the database for the password.
 */
function User(id, username, hashpass, callname){
  this.id = Number(id);
  this.username = username;
  this.hashpass = hashpass;
  this.callname = callname;
}

/* Queries the database for an user.
 * The argument should be an object with only 1 of the following attributes:
 *   - username: for looking up an user by their username
 *   - id: for looking up an user by their id
 * Returns undefined if user was not found.
 * Returns filled User object if found.
 */
function lookup(obj){
  var promise;
  if(obj.username){
    promise = client.query("SELECT * FROM users WHERE username = $1", [obj.username]);
  } else if(obj.id){
    promise = client.query("SELECT * FROM users WHERE id = $1", [obj.id]);
  } else throw Error("Object given as argument doesn't have recognizable attributes.");

  // Create user after query is done
  promise = promise.then(res => {
    if(!res.rows[0]){
      return undefined;
    } else {
      // Remove whitespace
      res.rows[0].username = res.rows[0].username.replace(/^ */g, '').replace(/ *$/g, '');
      res.rows[0].password = res.rows[0].password.replace(/^ */g, '').replace(/ *$/g, '');
      res.rows[0].callname = res.rows[0].callname.replace(/^ */g, '').replace(/ *$/g, '');

      return new User(res.rows[0].id, res.rows[0].username, res.rows[0].password, res.rows[0].callname);
    }
  });
  
  return promise;
}

/* Attempts to authenticate user with username 'user' and textual password 'pass'.
 * If authentication fails, returns undefined.
 * If it succeeds, returns a filled User object.
 */
function authenticate(user, pass){
  return lookup({username: user})
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
  const secret = crypto.randomBytes(keyBytes).toString('hex');
  const hash = crypto.createHmac('sha256', secret).update(pass).digest('hex');
  return client.query("INSERT INTO users(username, password, callname) VALUES ($1, $2, $3)", [user, secret + hash, name])
    .then(() => { return lookup({username: user}) });
}

/* Attempts to sign up a user with username 'user', password 'pass' and callname 'name.'
 * First, this function checks if a user with given username exists. If it already exists, nothing is done
 *   and the function returns undefined.
 * If the given 'user' is available for usage, then we insert the new user in the database. Function returns
 *   a filled User in this case.
 */
function sign_up(user, pass, name){
  return lookup({username: user})
    .then(found => {
      if(found){
        return undefined;
      } else {
        return add_user(user, pass, name).then(authUser => {
          return new User(authUser.id, authUser.username, authUser.hashpass, authUser.callname);
        });
      }
    })
}

/* Updates user information in the table for user with ID 'user_id'.
 * The only information available for updating are the password and the callname.
 * Password should given in textual form, we encrypt it.
 * This function always returns the filled User object. Always remember to catch the exception of the promise.
 * 'user' should be an object with at least the following attributes:
 *   - id: the id of the user to update (mandatory)
 *   - callname: the new callname of the user (optional)
 *   - password: the new textual password of the user (optional)
 */
function update_user(user){
  if(!user.id) throw Error("user must have an id");
  if(!user.callname && !user.password) return lookup({id: user_id});

  var setEntries = [];
  var values = [];
  var placeholders = ["$1", "$2", "$3", "$4", "$5"];

  // Add callname to the query
  if(user.callname){
    setEntries.push(" callname = " + placeholders.shift() + " ");
    values.push(user.callname);
  }

  // Add password to the query
  if(user.password){
    const secret = crypto.randomBytes(keyBytes).toString('hex');
    const hash = crypto.createHmac('sha256', secret).update(user.password).digest('hex');
    setEntries.push(" password = " + placeholders.shift() + " ");
    values.push(secret + hash);
  }

  var query = "UPDATE users ";
  query += "SET " + setEntries.join(',') + " ";
  query += "WHERE id = " + placeholders.shift() + " ";

  values.push(user.id);
  return client.query(query, values)
    .then(() => { return lookup({id: user.id}); });
}

/* Returns an array with all users in the database.
 */
function all_users(){
  return client.query("SELECT * FROM users")
    .then(res => {
      var users = []
      for(var i = 0; i < res.rows.length; i++){
        var row = res.rows[i];

        // Remove whitespace
        row.username = row.username.replace(/^ */g, '').replace(/ *$/g, '');
        row.password = row.password.replace(/^ */g, '').replace(/ *$/g, '');
        row.callname = row.callname.replace(/^ */g, '').replace(/ *$/g, '');

        users.push(new User(row.id, row.username, row.password, row.callname));
      }
      return users;
    });
}

function myip_get(){
  return client.query("SELECT ip FROM myip WHERE id = 1").then(res => { return res.rows[0].ip; });
}

function myip_insert(ip){
  return client.query("UPDATE myip SET ip = $1 WHERE id = 1", [ip]);
}

module.exports = {
  authenticate: authenticate,
  lookup: lookup,
  sign_up: sign_up,
  update_user: update_user,
  all_users: all_users,
  myip_get: myip_get,
  myip_insert: myip_insert,
}