const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class TrackRepository {
  create(options) {
    return normalizeDBQuery(db.Track.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.Track.findOne(query, "-__v"));
  }
  findAndUpdate(query, update) {
    return normalizeDBQuery(db.Track.findOneAndUpdate(query, update));
  }
}

module.exports = new TrackRepository();
