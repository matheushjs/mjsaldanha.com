/* db_client.js
 * Creates the database connection Pool for unique usage along the code.
 */


const sqlite3 = require("sqlite3");
const origClient = new sqlite3.Database("server/model/database.db");

/* Set up function wrappers */

function all(query, args){
  return new Promise((resolve, reject) => {
    origClient.all(query, args, (err, rows) => {
      if(err) reject(err);
      else resolve(rows);
    });
  });
}

function prepare(query, args){
  return {
    stmt: origClient.prepare(query, args),
    run: () => new Promise((resolve, reject) => {
      this.stmt.run((err, rows) => {
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
