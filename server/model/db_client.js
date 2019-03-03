/**
 * Creates the database connection Pool.
 *
 * We create a global object, and only this object is used to interact with the
 * database.
 *
 * @class Model::db_client.js
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

/**
 * Runs a query and returns all matching rows.
 *
 * @method all
 * @param {String} query The query to perform, with placeholders "?"
 * @param {List} args List with items to replace the placeholders.
 * @return {Promise} Promise containing a list of rows returned for the executed query.
 */
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

/**
 * Prepares a query, and returns it in an object.
 *
 * The returned object has the method `run()` which will execute the statement
 * and return all matching rows, if there are any.
 *
 * @method prepare
 * @param {String} query The query to perform, with placeholders "?"
 * @param {List} args List with items to replace the placeholders.
 * @return {Object} Object that has the method `run()` described above.
 */
function prepare(query, args){
  var stmt = origClient.prepare(query, args);
  return new Stmt(stmt);
}

module.exports = {
  all,
  prepare
};
