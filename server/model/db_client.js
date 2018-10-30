/* db_client.js
 * Creates the database connection Pool for unique usage along the code.
 */


const sqlite3 = require("sqlite3");
const origClient = new sqlite3.Database("server/model/database.db");

/* Set up function wrappers */

function all(query, args){
  return new Promise((resolve, reject) => {
    if(args){
      origClient.all(query, args, (err, rows) => {
        if(err) reject(err);
        else resolve(rows);
      });
    } else {
      origClient.all(query, (err, rows) => {
        if(err) reject(err);
        else resolve(rows);
      });
    }
  });
}

function prepare(query, args){
  var stmt = origClient.prepare(query, args);
  return {
    run: () => new Promise((resolve, reject) => {
      stmt.run((err, rows) => {
        if(err) reject(err);
        else resolve(rows);
      });
    }),
  }
}

module.exports = {
  all,
  prepare
};
