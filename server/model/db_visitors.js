/* db_visitors.js
 * Provides wrappers to reading/writing the counter of visitors
 */
const fs = require("fs");
const filePath = "server/model/visitorCount.dat";

var counter = -1;

// Initialize counter
fs.readFile(filePath, "utf8", (err, data) => {
  if(!err){
    counter = Number(data);
  } else {
    counter = 0;
  }
});

function inc(){
  counter += 1;
  fs.writeFile(filePath, counter, "utf8", (err) => {
    if(err){
      console.log(err);
    }
  });
  console.log(`New visitor! Counter is now: ${counter}.`);
}

function get(){
  if(counter === -1){
    throw "Counter hasn't been initialized yet."
  } else {
    return counter;
  }
}

module.exports = {
  inc,
  get,
};