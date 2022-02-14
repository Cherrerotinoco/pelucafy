const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema({
  userId: String,
  name: String,
  collaborative: Boolean,
  description: String,
  coverThumbnail: String,
  publicAccessible: Boolean,
  numberSongs: Number,
  followers: Number,
  trackIds: [
    {
      type: String,
      unique: true
    }
  ]
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
