const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = Schema(
  {
    title: String,
    rating: Number,
    url: {
      type: String,
      required: true,
    },
    popularity: String,
    thumbnail: String,
    thumbnail_public_id: String,
    track_public_id: String,
    createdAt: String,
    realeased: String,
    duration: Number,
    color: String,
    userId: String,
    genre: String,
    likedBy: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
