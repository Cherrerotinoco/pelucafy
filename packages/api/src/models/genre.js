const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const GenreSchema = Schema(
  {
    name: String,
    popularity: String
  }
);


const Genre = mongoose.model("Genre", GenreSchema);

module.exports = Genre;
