var Slides = require('./slides.js');
var MoodDb = require('./mooddb.js');
var ThreeScene = require('./ThreeScene.js');
var threeScene;

var SCsearch = SCsearch || {};

SCSearch = {

  init: function(player){
    this.player = player;
    $('.hide').click(this.hideSearch.bind(this));
    $('#toFirstSlide').click(this.firstSlide.bind(this));
    $('#toSecondSlide').click(this.secondSlide);
    $('#titleSearch').keydown(this.searchBarInput.bind(this));
    $('#songList').on("click", ".preview", this.trackPreview.bind(this));
    $('#songList').on("click", ".pauseReview", this.pauseTrackPreview.bind(this));
    $('#songList').on( "click", ".song", this.tagMood.bind(this));
    $('.moodChoice').click(this.addToMoodDb.bind(this));
  },

  hideSearch: function(){
    $('.slide').hide();
    $("#pause").hide();
    $("#play").show();
    this.player.song.pause();
    $('#track-title').html("");
    Slide.show('inputSong')
    Slide.show('enterSong')
  },

  firstSlide: function(){
    Slides.show('inputSong');
    this.player.song.pause();
    $('#track-title').html("");
  },

  secondSlide: function(){
    Slides.show('addSong');
  },

  searchBarInput: function(e){
    $('#songList').html("");
    if (e.keyCode == 13) {
      e.preventDefault();
      SC.get('/tracks', { q: $('#titleSearch').val() }, function(tracks) {
        if (tracks.length === 0) {
          $('#search-error').html("Can't find anything. Try again!");
          $('#titleSearch').val('');
        } else {
          var tenTracks = tracks.slice(0, 9);
          tenTracks.forEach(function(track) {
          if (typeof(track.stream_url) == "undefined") return;
            $('#songList').append("<li>" +
                                    "<ul class ='fetchedSongs'>" +
                                      "<li>" +
                                        "<img src ='/assets/play-3-16.png' class='preview' id='" + track.stream_url + "' track_id = '" +  track.id + "'>" +
                                      "</li>" +
                                      "<li>" +
                                        "<img src ='/assets/stop-3-16.png' class='pauseReview'>" +
                                      "</li>" +
                                      "<li>" +
                                        "<img class='song' id ='" + track.stream_url + "' track_id = '" + track.id + "' title = '" + track.title + "' src = '/assets/plus-5-16.png'>" +
                                      "</li>" +
                                      "<li>" +
                                        "<a href='#' >" + track.title +  "</a>" +
                                      "</li>" +
                                    "</ul>"+
                                  "</li>");
          });
          Slides.show('addSong')
          $('#songList').show();
        };
      });
    }
  }, 

  trackPreview: function(e){
    var pauseButton = $(e.target).parent().next('li').children('.pauseReview');
    $('.preview').show();
    $(e.target).hide();
    pauseButton.show();
    $("#play").hide();
    $("#pause").show();
    $('#track-title').html("Preview");
    var previewTrackId = $(e.target).attr('track_id');
    var previewTrackUrl = e.target.id;
    var previewTrack = [{track_id: previewTrackId , streamUrl: previewTrackUrl}];
    this.player.song.pause();
    this.player.getNewTracks(previewTrack);
  },

  pauseTrackPreview: function(e){
    var myPreview = $(e.target).parent().prev('li').children('.preview');
    $(e.target).hide();
    myPreview.show();
    $("#pause").hide();
    $("#play").show();
    this.player.song.pause();
  },

  tagMood: function(e){
    this.player.song.pause();
    this.stream_url = $(e.target).attr('id')
    this.track_id = $(e.target).attr('track_id');
    this.title = $(e.target).attr('title');
    Slides.show('songMood');
  },
  
  addToMoodDb: function(e){
    e.preventDefault();
    var player = this.player;
    var mood = e.target.id;
    Promise.resolve().then(function() {
      $('#songList').empty();
      return MoodDb.addSong(this.title, this.stream_url, mood, this.track_id);
    }).then(function(response){
      Slides.show('chooseMood');
      $('#enterSong').show();
      Promise.resolve().then(function() {
        return MoodDb.getSong(mood);
      }).then(function(response) {
        if (typeof(threeScene) == "undefined") {
          threeScene = Object.create(ThreeScene)
          threeScene.init(player);
          threeScene.animate();
        }
        response = _.shuffle(response);
        response.unshift({stream_url: this.stream_url, title: this.title, track_id: this.track_id});
        player.getNewTracks(response);
      })
    })
  }
}

module.exports = SCSearch;
