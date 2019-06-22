/**
 * Provides wrappers to reading/writing the counter of visitors.
 *
 * The counter is only read once, and stored in memory.
 * Then it is written every time the counter is incremented.
 *
 * @class Model::db_visitors.js
 */


const fs = require("fs");
const logger = require("../utils/logger.js");
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

/**
 * Increments the counter.
 * @method inc
 */
function inc(){
  counter += 1;
  fs.writeFile(filePath, counter, "utf8", (err) => {
    if(err){
      logger.error(err);
    }
  });
  logger.info(`New visitor! Counter is now: ${counter}.`);
}

/**
 * Returns the current value of the counter.
 *
 * Throws exception if the counter could not be initialized, but this should not happen.
 *
 * @method get
 * @return {Number} The counter.
 */
function get(){
  if(counter === -1){
    throw Error("Counter hasn't been initialized yet.");
  } else {
    return counter;
  }
}

module.exports = {
  inc,
  get,
};
