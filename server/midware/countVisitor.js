/**
 * This middleware checks if the visitor is a new visitor, by means of cookies.
 *
 * On the first visit, the user is assigned a cookie "firstVisit".
 * Then we use it to detect the second visit, which is when we increment the visitor counter.
 *
 * @class Midware::countVisitor.js
 */

const db_visitors = require("../model/db_visitors");
const logger = require("../utils/logger.js");

module.exports = (req, res, next) => {
  if(req.session.firstVisit === undefined){
    req.session.firstVisit = true;
  } else if(req.session.firstVisit === true){
    req.session.firstVisit = false;
    db_visitors.inc();
  }

  try {
    req.visitorCounter = db_visitors.get();
  } catch(e) {
    req.visitorCounter = -1;
    logger.error(e);
  }

  next();
};
