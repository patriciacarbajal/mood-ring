var AudioController = require('./audio.js');
var AudioAnalyzer = require('./audioAnalyzer.js');
var ThreeScene = require('./ThreeScene.js');
var MoodDb = require('./mooddb.js');
var Slides = require('./slides.js');
var Search = require('./search.js');
var player = Object.create(AudioController) || player;
var threeScene;

$(document).on('page:change', function () {
  if (player.song) {
    player.song.stop();
  }
});

$(document).ready(function() {
  var $playlist = $('#playlist');
  var $enterSong = $('#enterSong');
  var $chooseMood = $('#chooseMood')

  $chooseMood.click(function() {
    Slides.show('big-ring');
  });

  $enterSong.click(function() {
    Slides.show('inputSong');
    $('#search-error').empty();
    $('#titleSearch').val('');

  });

  $(document).mousemove(function() {
    $('body').css({'cursor' : 'auto'});
    $playlist.fadeIn('slow');
    hoverCrossout($('#big-ring'), $chooseMood);
    hoverCrossout($(".inputSlides"), $enterSong);

    if (timer) {
      clearTimeout(timer);
      timer = 0;
    };
    timer = setTimeout(function() {
      hoverListener($enterSong);
      hoverListener($playlist);
      hoverListener($chooseMood);
      $('body').css({'cursor' : 'none'});
    }, 2000);
  });

  hoverToggling($enterSong);
  hoverToggling($playlist);
  hoverToggling($chooseMood);
});

$('.welcome.show').ready(function() {
  var search = Object.create(Search)
  player.init();
  player.song.addEventListener("timeupdate", player.progressBar, false);
  player.song.addEventListener('ended', player.setNextTrack.bind(this));
  search.init(player);

  var current_mood = $('.current_mood').data('mood');
  Slides.show('chooseMood');
  MoodDb.getSong(current_mood)
  .then(function(response){
    if (typeof(threeScene) == "undefined") {
      threeScene = Object.create(ThreeScene)
      threeScene.init(player);
      threeScene.animate();
    }
    response = _.shuffle(response);
    player.getNewTracks(response);
    Slides.show('all-controls');
    player.animateProgressBar();
    $('#enterSong').show();
  });

  $("#play").click(function(){
    player.song.play();
    $("#play").hide();
    $("#pause").show();
  });

  $("#pause").click(function(){
    player.song.pause()
    $("#pause").hide();
    $("#play").show();
  });

  $("#next").click(function(){
    player.setNextTrack();
    $("#play").hide();
    $("#pause").show();
  });
});