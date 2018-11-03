/* db_client.js
 * Creates the database connection Pool for unique usage along the code.
 */


const sqlite3 = require("sqlite3");
const origClient = new sqlite3.Database("server/model/database.db");

/* Set up function wrappers that return Promises instead of using callbacks */

class Stmt {
  constructor(stmt){
    this.stmt = stmt;
  }

  run(){
    return new Promise((resolve, reject) => {
      this.stmt.run((err, rows) => {
        if(err) reject(err);
        else resolve(rows);
      });
    });
  }
}

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
  return new Stmt(stmt);
}

module.exports = {
  all,
  prepare
};
