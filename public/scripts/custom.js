$(window).scroll(function(){
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).removeClass("slideanim").addClass("slideframes");
    }
  });
});

$(document).ready(function(){
  $(".major-block:odd").css("background-color", "#e9e9e9");
});

/* Place footer at the bottom when needed */
function lowerTheFooter(){
  /* Get height of viewport */
  const vpHeight = $(window).height();
  
  /* Get height of body content */
  var children = $("body").children();
  var height = 0;
  for(var i = 0; i < children.length; i++){
    height += $(children[i]).outerHeight();
  }

  /* If content does not span the whole viewport, place footer on the bottom */
  /* Footer is initially within the body, so it's already accounted for */
  if(height < vpHeight){
    var footer = $(".elf-footer");
    footer.css("position", "absolute");
    footer.css("bottom", "0");
  } else {
    var footer = $(".elf-footer");
    footer.css("position", "");
    footer.css("bottom", "");
  }

  setTimeout(lowerTheFooter, 3000);
}
$(document).ready(lowerTheFooter);


/* Conditionally hide content and add modal button if the content exceeds a certain portion of the viewport
 * 
 * Steps to make this work:
 *   1. Take the big content and place into a partial .ejs file
 *   2. Include that content where it originally was
 *   3. Add a button beside such content. This button should trigger the modal.
 *   4. Add a boostrap modal that also includes that content
 *   5. Add the 'elf-modal-block' class to the block that cannot exceed 70% of the viewport
 *   6. Add the 'elf-modal-content' to the element that contains the whole content
 *   7. Add the 'elf-modal-button' to the button that triggers the modal
 */
function hideModals(){
  const elements = $(".elf-modal-block");

  for(var i = 0; i < elements.length; i++){
    const elem    = $(elements[i]);
    const content = elem.find(".elf-modal-content");
    const button = elem.find(".elf-modal-button");

    // At first, the element is on its correct height, so we store it as an attribute
    // We are also prepared for if any image 
    if(!elem.attr("fullheight") || elem.height() > Number(elem.attr("fullheight"))){
      elem.attr("fullheight", elem.height());
    }

    const vpRatio = elem.attr("fullheight") / $(window).height(); // viewport ratio

    // We only modalize elements whose height is larger 70% of the viewport
    if(vpRatio > 0.7){
      // Warp content and add fading background
      if(!content.hasClass("elf-modal-wrapped")){
        content.addClass("elf-modal-wrapped");
      }

      // Show button
      button.show();
    } else {
      content.removeClass("elf-modal-wrapped");

      // Hide button
      button.hide();
    }
  }
}

$(document).ready(hideModals);
$(window).resize(hideModals);

/* Returns the total height of $el that is inside the viewport.
 */
function getVisible($el) {    
  var scrollTop = $(this).scrollTop(),
      scrollBot = scrollTop + $(this).height(),
      elTop = $el.offset().top,
      elBottom = elTop + $el.outerHeight(),
      visibleTop = elTop < scrollTop ? scrollTop : elTop,
      visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
  return visibleBottom - visibleTop;
}

/* Control element classes so that they have that class only when they are visible in the viewport.
 * Elements that should be controlled should have the class "elf-class-control".
 * Class that should be removed/added as it disappears/appears in the viewport should be in data-control attribute.
 */
function classInViewControl(){
  $(".elf-class-control").each(function(index, value){
    var $el = $(value);
    var visiblePortion = getVisible($el);
    var controlClass = $el.attr("data-control");

    if(!controlClass){
      console.error("Expected data-control but did not find it: " + value);
      return;
    }

    if(visiblePortion >= 0){
      if(!$el.hasClass(controlClass)){
        $el.addClass(controlClass);
      }
    } else {
      $el.removeClass(controlClass);
    }

    $("#elf-debug").text($(value).attr("data-control"));
  });
}

$(window).on("resize scroll", classInViewControl);