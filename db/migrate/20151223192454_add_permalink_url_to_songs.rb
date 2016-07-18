class AddPermalinkUrlToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :permalink_url, :string
  end
end
