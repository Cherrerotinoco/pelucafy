const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  findAll(query) {
    return normalizeDBQuery(
      db.Playlist.find(query),
    );
  }
}

module.exports = new PlaylistRepository();
