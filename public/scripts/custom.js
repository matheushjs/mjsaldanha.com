$(window).scroll(function(){
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).addClass("slideframes");
    }
  });
});

$(document).ready(function(){
  $(".major-block:odd").css("background-color", "#e9e9e9");
});

/* Place footer at the bottom when needed */
$(document).ready(function(){
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
  }
});


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
$(document).ready(function(){
  const elements = $(".elf-modal-block");

  for(var i = 0; i < elements.length; i++){
    const elem    = $(elements[i]);
    const content = elem.find(".elf-modal-content");
    const button = elem.find(".elf-modal-button");
    const vpRatio = elem.height() / $(window).height(); // viewport ratio

    // We only modalize elements whose height is larger 70% of the viewport
    if(vpRatio > 0.7){
      // Warp content and add fading background
      content.css("max-height", "70vh");
      content.css("overflow", "hidden");
      content.css("border-radius", "10px");
      content.css("background", "linear-gradient(180deg, #fff0 50%, #444f 100%)");

      // Show button
      button.show();
    } else {
      // Hide button
      button.hide();
    }
  }
});