const renderer = require("../view/renderer");

/* This middleware makes sure the object req.renderer exists.
 * req.renderer is a Renderer object that should be used to render all pages.
 */
module.exports = (req, res, next) => {
  let callname = req.session.callname;
  let specialUser = req.specialUser;
  req.renderer = new renderer.Renderer(callname, specialUser);
  next();
}