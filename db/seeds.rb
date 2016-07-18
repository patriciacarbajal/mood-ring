# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

#Sleepy
Song.create(title: 'Adventure Time - Sleepy Puppies', stream_url: 'https://api.soundcloud.com/tracks/28761782/stream', mood: "Sleepy", track_id: "28761782")
Song.create(title: 'Benjamin Francis Leftwich - Atlas Hands', stream_url: 'https://api.soundcloud.com/tracks/39533372/stream', mood:'Sleepy', track_id: "39533372")
Song.create(title: "Atlas - Coldplay", stream_url: "https://api.soundcloud.com/tracks/120434119/stream", mood: 'Sleepy')

#Happy
Song.create(title: 'Happy - Pharrel william', stream_url: "https://api.soundcloud.com/tracks/144773970/stream", mood: 'Happy', track_id: "144773970")
Song.create(title: 'Happy - Never Shout Never', stream_url: "https://api.soundcloud.com/tracks/2394840/stream", mood: 'Happy', track_id: "2394840")
Song.create(title: "I Caught Myself - Paramore", stream_url: "https://api.soundcloud.com/tracks/4486989/stream", mood: 'Happy', track_id: "4486989")

#Sad
Song.create(title: "Service And Sacrifice", stream_url: "https://api.soundcloud.com/tracks/164353339/stream", mood: 'Melancholy', track_id: "164353339")
Song.create(title: "NeYo - Mad", stream_url: "https://api.soundcloud.com/tracks/85986175/stream", mood: 'Melancholy', track_id: "85986175")
Song.create(title: "how to never stop being sad", stream_url: "https://api.soundcloud.com/tracks/71204300/stream", mood: 'Melancholy', track_id: "71204300")

#Angry
Song.create(title: "Three Days Grace - I Hate Everything About You", stream_url: "https://api.soundcloud.com/tracks/181267250/stream", mood: 'Angry', track_id: "181267250")
Song.create(title: "Steven Universe - Synchronize/Sugilite", stream_url: "https://api.soundcloud.com/tracks/165861330/stream", mood: 'Angry', track_id: "165861330")
Song.create(title: "Andrew W.K - Ready to Die", stream_url: "https://api.soundcloud.com/tracks/45572256/stream", mood: 'Angry', track_id: "45572256")

#Excited
Song.create(title: "Zizibum by X-Ray", stream_url: "https://api.soundcloud.com/tracks/25728427/stream", mood: 'Excited', track_id: "25728427")
Song.create(title: "Pepper Steak - OFF", stream_url: "https://api.soundcloud.com/tracks/75790279/stream", mood: 'Excited', track_id: "75790279")
Song.create(title: "M.O.O.N. - Hydrogen", stream_url: "https://api.soundcloud.com/tracks/57180067/stream", mood: 'Excited', track_id: "57180067")

#Chill
Song.create(title: "This ain't no place for a hero!", stream_url: "https://api.soundcloud.com/tracks/163175401/stream", mood: 'Chill', track_id: "163175401")
Song.create(title: "Paradise - Coldplay (Dubstep Remix)", stream_url: "https://api.soundcloud.com/tracks/50056779/stream", mood: 'Chill', track_id: "50056779")
Song.create(title: "Snoop Dogg vs The Doors - Riders On the Storm", stream_url: "https://api.soundcloud.com/tracks/307505/stream", mood: 'Chill', track_id: "307505")