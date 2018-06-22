/* db_myip.js
 * Provides wrappers to reading/writing the current IP stored in the database.
 */

const client = require('./db_client').client;

// Returns a Promise resolved to the current stored IP (as a string)
function get(){
  return client.query("SELECT ip FROM myip WHERE id = 1").then(res => { return res.rows[0].ip; });
}

// Changes current stored IP for the given 'ip'
function insert(ip){
  return client.query("UPDATE myip SET ip = $1 WHERE id = 1", [ip]);
}

module.exports = {
  get: get,
  insert: insert,
}
