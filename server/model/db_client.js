/* db_client.js
 * Creates the database connection Pool for unique usage along the code.
 */


const sqlite3 = require("sqlite3");
const client = new sqlite3.Database("server/model/database.db");

module.exports = {
  client
};
