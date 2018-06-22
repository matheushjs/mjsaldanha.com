/* db_client.js
 * Creates the database Client for unique usage along the code.
 */


const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL || "postgres://mjsaldanha_com:mjsaldanha_com@localhost",
  ssl: true,
});

client.connect();

module.exports = {
  client
};
