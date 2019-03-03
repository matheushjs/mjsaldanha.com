/**
 * This middleware checks if the visitor is a new visitor, by means of cookies.
 * On the first visit, the user is assigned a cookie "firstVisit".
 * Then we use it to detect the second visit, which is when we increment the visitor counter.
 *
 * @method countVisitor.js
 * @for Midware
 */

const db_visitors = require("../model/db_visitors");

module.exports = (req, res, next) => {
  if(req.session.firstVisit == null){
    req.session.firstVisit = true;
  } else if(req.session.firstVisit === true){
    req.session.firstVisit = false;
    db_visitors.inc();
  }

  try {
    req.visitorCounter = db_visitors.get();
  } catch(e) {
    req.visitorCounter = -1;
    console.log(e);
  }

  next();
};
