var MoodDb = require('./mooddb.js');
var ThreeScene = require('./ThreeScene.js');
var Slides = require('./slides.js');

var AudioController = {
  
  init: function(){
    this.song = new Audio();
    this.song.crossOrigin = "anonymous";
    this.song.src = '';
  },

  getNewTracks: function(newTracks){
    if (!newTracks.length) return;
    this.trackPlaylist = [];
    this.trackTitles = [];
    this.trackObjects = newTracks;
    this.trackNumber = 0;
    this.grabPlaylist();
    SC.stream('/tracks/' + this.trackObjects[this.trackNumber].track_id, function(track){
      this.song = track
      this.song.play();
    }.bind(this));
    $('#track-title').html(this.trackTitles[this.trackNumber]);
  },

  grabPlaylist: function(){
    for(var i = 0; i < this.trackObjects.length; i++) {
      this.trackPlaylist.push(this.trackObjects[i].stream_url + "?client_id=e67d17cea5de0deead27fed93e338691");
      this.trackTitles.push(this.trackObjects[i].title);
    }
  },

  setNextTrack: function(){
    this.trackNumber = (this.trackNumber + 1)% this.trackPlaylist.length;
    this.song.stop();
    SC.stream('/tracks/' + this.trackObjects[this.trackNumber].track_id, function(track){
      this.song = track
      this.song.play();
    }.bind(this));
    $('#track-title').html(this.trackTitles[this.trackNumber]);
  },

  mobileControls: function(){
    $('#mobile-controls').show();
  },

  progressBar: function(){
    if ( $( "#playlist" ).length ) {
      var progressBarWidth = document.getElementById('playlist').offsetWidth;
      var factor = progressBarWidth/this.song.duration;
      if (this.song.currentTime > 0 && Math.abs(this.song.currentTime - this.previousTime ) > 0.25) {
        var width = this.song.currentTime * factor;
        $("#progressBar").css("width", width);
        this.previousTime = this.song.currentTime;
      }
    }
  },

  animateProgressBar: function(){
    var width = this.progressBar();
    $('#progress').css('width', width +' px');
    window.requestAnimationFrame(this.animateProgressBar.bind(this));
  }
}

module.exports = AudioController;

