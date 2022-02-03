const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const AlbumSchema = Schema({
  title: String,
  year: Number,
  thumbnail: String,
  totalTracks: Number,
  userId: mongoose.Schema.Types.ObjectId,
  likedBy: [
    {
      userId: mongoose.Schema.Types.ObjectId,
    },
  ],
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
