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
    createdAt: String,
    realeased: String,
    duration: Number,
    color: String,
    userId: String,
    genre: String,
    // genre: {
    //   id: String,
    //   name: String,
    // },
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
