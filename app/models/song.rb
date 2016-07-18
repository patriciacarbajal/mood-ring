class Song < ActiveRecord::Base
  validates :title, :mood, :stream_url, presence: true
  validates :title, :stream_url, uniqueness: true
end
