/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has javascript related showing/hiding modal contents.
 *
 * @class Client::loginForms.js
 */

/**
 * Shows up a modal on the screen.
 *
 * @param {Object} obj
 * @param {String} obj.headerText The text to display on the header.
 * @param {Boolean} obj.addSpinner Whether to display a spinner icon or not.
 * @param {JQuery,String} obj.body HTML to display on the body of the modal.
 * @return {JQuery} The modal object, that can be removed using the .remove method.
 */
function loadingModal(obj){
  obj = obj || {};
  obj.headerText = obj.headerText || "Please, wait a moment.";
  obj.addSpinner = obj.addSpinner || true;
  obj.body = obj.body || "";

  var content = {};

  if(obj.addSpinner){
    content.spinner = $("<div></div>").addClass("my-1 spinner-border");
  } else {
    content.spinner = "";
  }

  content.header = $("<h3></h3>").addClass("my-1").text(obj.headerText);
  if(obj.body)
    content.header.addClass("pb-1 border-bottom");

  if(obj.body){
    content.body = $("<div></div>")
    .addClass("my-2 text-left")
    .append(obj.body);
  } else {
    content.body = "";
  }

  // Css for the block that occupies the whole height/width of the screen.
  var outerCss = {
    "position": "fixed",
    "top": "0px",
    "bottom": "0px",
    "left": "0px",
    "right": "0px",
    "display": "block",
    "background": "#0007",
    "z-index": "1050"
  };

  // Css for the inner block that will hold the content
  var innerCss = {
    "min-height": "20vh",
    "top": "40vh",
    "position": "relative",
    "background": "#ffff",
    "margin": "auto",
    "padding-top": "30px",
    "padding-bottom": "30px",
  };

  var div = $("<div></div>").css(outerCss).append([
    $("<div></div>").css(innerCss).addClass("border rounded text-center container").append([
      content.spinner,
      content.header,
      content.body
    ])
  ]);

  $("body").append(div);
  return div;
}

export default {
  loadingModal
};
