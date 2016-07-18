var MoodDb = MoodDb || {};

MoodDb.addSong = function(title, stream_url, mood, track_id, permalink_url) {
  return Promise.resolve($.ajax ({
    url: '../songs/create',
    data: {title: title, stream_url: stream_url, mood: mood, track_id: track_id, permalink_url: permalink_url},
    type: "POST"
  }));
}

MoodDb.getSong = function(mood) {
  return Promise.resolve($.ajax({
    url: '../songs/index',
    type: "GET",
    dataType: "json",
    data: {mood: mood}
  }));
};

module.exports = MoodDb;