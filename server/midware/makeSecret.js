var fs = require("fs");
var path = require("path");

// Returns whether user with id "id" has a secret page.
function userHasSecret(userid){
  var dirs = fs.readdirSync(path.resolve("server/view/secret"));

  for(var i = 0; i < dirs.length; i++){
    dirs[i] = Number(dirs[i]);
  }

  return dirs.indexOf(Number(userid)) !== -1;
}

/* Checks if user has a special page
 * If they have a special page, set req.specialUser to 'true', else 'false'.
 */
module.exports = (req, res, next) => {
  if(req.session.username && userHasSecret(req.session.userid)){
    req.specialUser = true;
  } else {
    req.specialUser = false;
  }
  next();
}