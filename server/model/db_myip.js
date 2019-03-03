/**
 * Provides wrappers to reading/writing the current IP stored persistently.
 *
 * @class Model::db_myip.js
 */

const fs = require("fs");
const filePath = "server/model/ip.dat";

var myIp = null;

/**
 * Returns the current stored IP.
 *
 * @method get
 * @return {Promise} The current IP, as a string.
 */
function get(){
  return new Promise((resolve, reject) => {
    if(myIp){
      resolve(myIp);
      return;
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if(err){
        reject(err);
      } else {
        myIp = data;
        resolve(data);
      }
    });
  });
}

/**
 * Changes current stored IP for the given "ip".
 *
 * @method insert
 * @param {String} ip The IP to store.
 * @return {Promise} Promise that returns the new ip if successful, or rejects if a failure happens.
 */
function insert(ip){
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, ip, "utf8", (err) => {
      if(err){
        reject(err);
      } else {
        if(ip.length > 100){
          reject("Given IP is too big. Possible injection attack detected.");
        } else {
          myIp = ip;
          resolve(ip);
        }
      }
    });
  });
}

module.exports = {
  get,
  insert,
};
