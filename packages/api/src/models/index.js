const UserModel = require("./user-model");
const TrackModel = require("./tracks");
const PlaylistModel = require("./playlist");
const GenreModel = require("./genre");
const AlbumModel = require("./albums");

module.exports = {
  Playlist: PlaylistModel,
  User: UserModel,
  Track: TrackModel,
  Genre: GenreModel,
  Album: AlbumModel,
};
