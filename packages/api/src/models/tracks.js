const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TrackSchema = Schema(
  {
    name: String,
    rating: Number,
    url: {
      type: String,
      required: true
    },
    popularity: String,
    thumbnail: String,
    createdAt: String,
    realeased: String ,
    duration: mongoose.Decimal128,
    color: String,
    userId: String,
    genre: {
      id: String,
      name: String,
      ref: 'Genre'
    },
    albums: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Album',
      unique: true
    }],
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      unique: true
    }]
  },
  {
    timestamps: true,
  },
);


const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
