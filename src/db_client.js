/* db_client.js
 * Creates the database Client for unique usage along the code.
 */


const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  password: "password",
});

client.connect();

module.exports = {
  client: client
}