const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class PlaylistRepository {
  create(data) {
    console.log("PlaylistRepository");
    console.log(data);
    return normalizeDBQuery(db.Playlist.create(data));
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
    return normalizeDBQuery(db.Playlist.findOneAndDelete(query, update));
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
