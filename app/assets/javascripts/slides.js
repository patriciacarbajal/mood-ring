var Slides = Slides || {};

Slides.show = function(slide) {
  $('.slide').fadeOut("normal");
  $("#" + slide).fadeIn("normal");
};

module.exports = Slides;