const UserRepository = require("./user-repository");
const TrackRepository = require("./track-repository");
const SearchRepository = require("./search-repository");
const PlaylistRepository = require("./playlist-repository");

module.exports = {
  UserRepo: UserRepository,
  TrackRepo: TrackRepository,
  SearchRepository: SearchRepository,
  PlaylistRepo: PlaylistRepository,
};
