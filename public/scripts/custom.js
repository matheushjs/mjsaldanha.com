/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has general javascript code that applies to many pages.
 *
 * @class Client::custom.js
 */

"use strict";

/**
 * Makes element slide into the screen when the user scrolls the page down enough to see such element.
 * @method slideOnScroll
 */
function slideOnScroll(){
  $(".slideanim").each(function(){
    var pos = $(this).offset().top;

    var winTop = $(window).scrollTop();
    if (pos < winTop + 600) {
      $(this).removeClass("slideanim").addClass("slideframes");
    }
  });
}

/* Place footer at the bottom when needed */
function lowerTheFooter(){
  /* Get height of viewport */
  var vpHeight = $(window).height();

  /* Get height of body content */
  var height = $("body").height();

  /* Get height of the footer */
  var footer = $(".elf-footer");
  var footHeight = footer.height();

  /* If the footer's position is absolute, it should be added to the height */
  if(footer.css("position") === "absolute"){
    height += footHeight;
  }

  /* We underestimate the viewport height */
  vpHeight -= 30;

  /* If content does not span the whole viewport, place footer on the bottom */
  /* Footer is initially within the body, so it's already accounted for */
  if(height < vpHeight){
    footer.css("position", "absolute");
    footer.css("bottom", "0");
  } else {
    footer.css("position", "");
    footer.css("bottom", "");
  }
}


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

/**
 * Control element classes so that they have that class only when they are visible in the viewport.
 * 
 * Elements that should be controlled should have the class "elf-class-control".
 * Class that should be removed/added as it disappears/appears in the viewport should be in data-control attribute.
 * 
 * MAIN USAGE: Hide CSS animations when they aren't visible, for performance reasons.
 * @method toggleClassOnVisible
 */
function toggleClassOnVisible(){
  $(".elf-class-control").each(function(index, value){
    var $el = $(value);
    var visiblePortion = getVisible($el);
    var controlClass = $el.attr("data-control");

    if(!controlClass){
      console.error("Expected data-control but did not find it: " + value);
      return;
    }

    $el.toggleClass(controlClass, visiblePortion >= 0);
  });
}

function textFlowAnimation(){
  const TIMEOUT = 700;
  const FLOW_TIME = 6000;
  var canvas = $("#welcome .elf-textflow");

  if(canvas.length === 0)
    return;

  // If canvas is not visible, we don't do anything.
  if(getVisible(canvas) <= 0){
    setTimeout(textFlowAnimation, TIMEOUT);
    return;
  }

  const keywords = [
    "High Performance Computing",
    "Neural Networks",
    "Deep Learning",
    "Maximum Likelihood Estimation",
    "Statistical Inference",
    "GPU Programming",
    "Computational Models",
    "Parameter Servers",
    "Task Scheduling",
    "Distributed Programs",
    "Parallel Computing",
    "Supercomputers"
  ];
  var randInt = Math.floor(Math.random() * keywords.length);
  var keyword = keywords[randInt];

  // Begins on the left (0) or on the right (1)?
  var randSide = Math.floor(Math.random() * 2);
  var randW = Math.random() * (canvas.width() / 2);
  var randH = Math.random() * canvas.height();

  // If begins on the right, invert randW
  if(randSide === 1){
    randW = canvas.width() - randW;
  }

  // Decide destiny width
  var randWFinal;
  if(randSide === 0){
    randWFinal = randW + 0.8 * Math.random() * (canvas.width() - randW);
  } else {
    randWFinal = randW + 0.8 * Math.random() * (0 - randW);
  }

  // The word's position is given by its left-most portion.
  // We try to change it to the center, by estimating its size.
  randW = randW - 100;
  randWFinal = randWFinal - 100;

  var p = $("<p></p>");
  p.text(keyword);
  p.css({
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    "position": "absolute",
    "top": randH,
    "left": randW,
    "opacity": "0"
  });

  canvas.append(p);

  p.animate({
    left: [randWFinal, "linear"],
  }, {
    queue: false,
    duration: FLOW_TIME,
  })
  .animate({ opacity: 1 }, FLOW_TIME/2)
  .animate({ opacity: 0 }, FLOW_TIME/2, function(){
    p.remove();
  });

  setTimeout(textFlowAnimation, TIMEOUT);
}

$(window).on("scroll", function(){
  slideOnScroll();
  toggleClassOnVisible();
});

$(window).on("resize", function(){
  toggleClassOnVisible();
  hideModals();
});

$(document).ready(function(){
  $(".major-block:odd").css("background-color", "#e9e9e9");
  hideModals();
  
  lowerTheFooter();
  setInterval(lowerTheFooter, 3000);

  textFlowAnimation();
});