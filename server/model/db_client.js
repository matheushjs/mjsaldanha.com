/**
 * Creates the database connection Pool.
 *
 * We create a global object, and only this object is used to interact with the
 * database.
 *
 * @class Model::db_client.js
 */

const logger = require("../utils/logger");
const mysqlInfo = require("../utils/private_code").mysqlInfo;

const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 15,
  host: "localhost",
  user: mysqlInfo.username,
  password: mysqlInfo.password,
  database: mysqlInfo.database,
  charset: "utf8mb4"
});

/* Set up function wrappers that return Promises instead of using callbacks */

class Stmt {
  constructor(stmt){
    this.stmt = stmt;
  }

  run(){
    return new Promise((resolve, reject) => {
      pool.query(this.stmt, (err, rows) => {
        if(err){
          if(err.fatal)
            logger.error(`Error when running SQL query "${this.stmt}": ` + err);
          reject(err);
        }

        resolve(rows);
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
 * @async
 */
function all(query, args = []){
  return new Promise((resolve, reject) => {
    pool.query(query, args, (err, rows) => {
      if(err){
        if(err.fatal)
          logger.error(`Error when running SQL query "${query} with args ${args}": ` + err);
        reject(err);
      }

      resolve(rows);
    });
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
  var stmt = mysql.format(query, args);
  return new Stmt(stmt);
}

module.exports = {
  all,
  prepare
};
