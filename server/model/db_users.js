/* db_users module
 * 
 * - No leading/trailing whitespace is to be allowed in usernames, passwords, callnames etc,
 *   because the db fills these fields with whitespace, so we remove all whitespace from all
 *   strings retrieved from the database.
 * 
 * - Since the pg module offers only functions that return Promises, we also implement functions
 *   using this pattern.
 */


const crypto = require("crypto");
const keyBytes = 16; // Size of the secret keys to be used with Hmac
const client = require("./db_client");

// Table schemas
// CREATE TABLE users(username CHAR(128) NOT NULL, password CHAR(96) NOT NULL, callname CHAR(128))


/* User object to represent a user in memory.
 * "hashpass" receives the hash value stored in the database for the password.
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
 * Returns null if user was not found.
 * Returns filled User object if found.
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

/* Attempts to authenticate user with username "user" and textual password "pass".
 * If authentication fails, returns null.
 * If it succeeds, returns a filled User object.
 */
function authenticate(user, pass){
  return lookup({username: user})
    .then((recUser) => {
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
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

/* Inserts a new user in the database, with username "user", password "pass" and call name "name".
 * Inserting an existing user results in an exception that can be caught.
 */
function addUser(user, pass, name){
  const secret = crypto.randomBytes(keyBytes).toString("hex");
  const hash = crypto.createHmac("sha256", secret).update(pass).digest("hex");
  return new Promise((resolve, reject) => {
    var stmt = client.prepare("INSERT INTO users(username, password, callname) VALUES (?, ?, ?)", [user, secret + hash, name]);
    stmt.run((err, rows) => {
      if(err){
        reject(err);
      } else {
        resolve(lookup({username: user}));
      }
    });
  });
}

/* Attempts to sign up a user with username "user", password "pass" and callname "name."
 * First, this function checks if a user with given username exists. If it already exists, nothing is done
 *   and the function returns null.
 * If the given "user" is available for usage, then we insert the new user in the database. Function returns
 *   a filled User in this case.
 */
function signUp(user, pass, name){
  return addUser(user, pass, name)
    .then((authUser) => {
      return new User(authUser.id, authUser.username, authUser.hashpass, authUser.callname);
    })
    .catch((err) => { // User already exists
      return null;
    });
}

/* Updates user information in the table for user with ID "user_id".
 * The only information available for updating are the password and the callname.
 * Password should given in textual form, we encrypt it.
 * This function always returns the filled User object. Always remember to catch the exception of the promise.
 * "user" should be an object with at least the following attributes:
 *   - id: the id of the user to update (mandatory)
 *   - callname: the new callname of the user (optional)
 *   - password: the new textual password of the user (optional)
 */
function updateUser(user){
  if(!user.id){
    throw Error("user must have an id");
  }
  if(!user.callname && !user.password){
    return lookup({id: user.id});
  }

  // First we lookup the user, obtaining a user object.
  // We change this user object with new values, and update the database with this new user object.
  return lookup(user)
    .then(retUser => {
      if(!user) return null;

      if(user.callname){
        retUser.callname = user.callname;
      }

      if(user.password){
        const secret = crypto.randomBytes(keyBytes).toString("hex");
        const hash = crypto.createHmac("sha256", secret).update(user.password).digest("hex");
        retUser.hashpass = secret + hash;
      }

      return new Promise((resolve, reject) => {
        var stmt = client.prepare("UPDATE users SET callname = ?, password = ? WHERE rowid = ?", [retUser.callname, retUser.hashpass, retUser.id]);      
        stmt.run((err, rows) => {
          if(err){
            reject(err);
          } else {
            resolve(retUser);
          }
        });
      });
    });
}

/* Returns an array with all users in the database.
 */
function allUsers(){
  return new Promise((resolve, reject) => {
    client.all("SELECT rowid, * FROM users", (err, rows) => {
      if(err){
        reject(err);
        return;
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
      resolve(users);
    });
  })
  .catch((err) => {
    console.log(err);
    return [];
  });
}

module.exports = {
  authenticate,
  lookup,
  signUp,
  updateUser,
  allUsers,
};
