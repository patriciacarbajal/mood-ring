class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string   :title, null: false
      t.string   :stream_url, null: false
      t.string   :mood, null: false

      t.timestamps
    end
  end
end
