var timer;

var hoverToggling = function(element) {
  element.hover(function() {
    element.fadeIn();
    element.toggleClass("hovering");
  },
  function() {
    element.toggleClass("hovering")
  })
}

var hoverListener = function(element) {
  if(!element.hasClass("hovering")) {
    element.fadeOut('slow')
  }
}

var hoverCrossout = function(element1, element2) {
  if (!element1.is(":visible")) {
    element2.fadeIn("slow");
  }
}
