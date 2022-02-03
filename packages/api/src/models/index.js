const UserModel = require("./user-model");
const TrackModel = require("./tracks");
const GenreModel = require("./genre");
const AlbumModel = require("./albums");

module.exports = {
  User: UserModel,
  Track: TrackModel,
  Genre: GenreModel,
  Album: AlbumModel
};
