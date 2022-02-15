const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const PlaylistSchema = Schema({
  userId: String,
  name: String,
  collaborative: Boolean,
  description: String,
  coverThumbnail: String,
  coverThumbnail_public_id: String,
  publicAccessible: Boolean,
  numberSongs: Number,
  followedBy: [
    {
      type: String,
    },
  ],
  trackIds: [
    {
      type: String,
    },
  ],
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
