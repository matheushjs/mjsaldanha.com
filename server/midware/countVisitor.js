/* This middleware checks if the visitor is a new visitor, by means of cookies.
On the first visit, the user is assigned a cookie "firstVisit".
Then we use it to detect the second visit, which is when we increment the visitor counter.
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

module.exports = (req, res, next) => {
  // Counter for some reason could not be initialized (maybe race conditions)
  if(counter === -1){
    next();
    return;
  }

  if(req.session.firstVisit === undefined){
    req.session.firstVisit = true;
  } else if(req.session.firstVisit === true){
    req.session.firstVisit = false;
    
    counter += 1;
    fs.writeFile(filePath, counter, "utf8", err => {
      if(err){
        console.log(err);
      }
    });

    console.log(`New visitor! Counter is now: ${counter}.`);
  }

  req.visitorCounter = counter;
  next();
};