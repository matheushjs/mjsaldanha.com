var fs = require("fs");
const secretusers = require("../routes/secret").users;

/**
 * This is not a class; just a YUIdoc way of grouping multiple midwares in the same place.
 *
 * Each method is actually a midware implemented in its own file under the `midware/` directory.
 *
 * @class midware
 */

/**
 * Handles user privilege variables in `req.session`.
 *
 * **Depends on**:
 * - `req.session.username`: for deciding if the user is special
 *
 * **Generates**:
 * - `req.specialUser`: boolean saying whether the 
 *
 * We simply read the contents of `req.session.username` to see if the user is logged in.
 * If they are logged in, and their username is in the list of users that have a secret page,
 *   then we set **`req.specialUser`** to true; else, it is false.
 *
 * @method makeSecret.js
 * @for midware
 */


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
