const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  create(options) {
    return normalizeDBQuery(db.Playlist.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.Playlist.findOne(query, "-__v"));
  }
  findAndUpdate(query, update) {
    return normalizeDBQuery(
      db.Playlist.findOneAndUpdate(query, update, { new: true }),
    );
  }
  findAndDelete(query, update) {
    return normalizeDBQuery(db.Playlist.findOneAndUpdate(query, update));
  }

  findAndReplace(query, update) {
    return normalizeDBQuery(
      db.Playlist.findOneAndReplace(query, update, { new: true }),
    );
  }

  findAll({ query, limit, order, toSkip }) {
    return normalizeDBQuery(
      db.Playlist.find(query).sort(order).skip(toSkip).limit(limit),
    );
  }
}

module.exports = new PlaylistRepository();
