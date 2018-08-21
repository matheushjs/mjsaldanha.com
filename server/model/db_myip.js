/* db_myip.js
 * Provides wrappers to reading/writing the current IP stored persistently.
 */

const fs = require("fs");
const filePath = "server/model/ip.dat";

var myIp = null;

// Returns a Promise resolved to the current stored IP (as a string)
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

// Changes current stored IP for the given "ip"
function insert(ip){
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, ip, "utf8", err => {
      if(err){
        reject(err);
      } else {
        if(ip.length > 100){
          reject("Given IP is too big. Possible injection attack detected.");
        } else {
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
