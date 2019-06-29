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

  var div = $("<div class='modal' tabindex='-1' role='dialog'></div>").append(
    $("<div class='modal-dialog modal-dialog-centered text-center' role='document'>").append(
      $("<div class='modal-content border rounded shadow'></div>").append(
        $("<div class='modal-body'></div>").append([
          content.spinner,
          content.header,
          content.body
        ])
      )
    )
  );

  $("body").append(div);
  div.modal();
  
  // Rewrite its 'remove' method, because just removing it leaves the background darkened.
  div.removeOld = div.remove;
  div.remove = function(){
    this.modal("hide");
    this.removeOld();
  };

  return div;
}

export default {
  loadingModal
};
