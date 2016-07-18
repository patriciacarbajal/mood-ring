require 'rails_helper'

describe SongsController, :type => :controller do
  let(:song1) { Song.create(title: "Service And Sacrifice", stream_url: "https://api.soundcloud.com/tracks/164353339/stream", mood: 'Melancholy')}
  let(:song2) {Song.create(title: "NeYo - Mad", stream_url: "https://api.soundcloud.com/tracks/85986175/stream", mood: 'Melancholy')}
  let(:song3) {Song.create(title: "how to never stop being sad", stream_url: "https://api.soundcloud.com/tracks/71204300/stream", mood: 'Melancholy')}
  describe "GET index" do
    it "retrieves songs with the selected mood" do
      songs = Song.where(mood: 'Melancholy')
      expect(songs.all{ |s| s.mood == 'Melancholy'}).to be_truthy
    end
  end
end