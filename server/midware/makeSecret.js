var fs = require("fs");
const secretusers = require("../routes/secret").users;

/* Checks if user has a special page
 * If they have a special page, set req.specialUser to 'true', else 'false'.
 */
module.exports = (req, res, next) => {
  if(req.session.username && secretusers.indexOf(req.session.username) >= 0){
    req.specialUser = true;
  } else {
    req.specialUser = false;
  }
  next();
};