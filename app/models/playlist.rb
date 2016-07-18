class Playlist < ActiveRecord::Base
  def query_soundcloud(genre)
    @tracks = CLIENT.get('/tracks', limit: 10, tags: genre)
  end
end
