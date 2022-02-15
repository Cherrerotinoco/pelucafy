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
    return normalizeDBQuery(
      db.Track.findOneAndUpdate(query, update, { new: true }),
    );
  }
  findAndDelete(query) {
    return normalizeDBQuery(db.Track.findOneAndDelete(query));
  }

  findAndReplace(query, update) {
    return normalizeDBQuery(
      db.Track.findOneAndReplace(query, update, { new: true }),
    );
  }

  findAll({ query, limit, order, toSkip }) {
    return normalizeDBQuery(
      db.Track.find(query).sort(order).skip(toSkip).limit(limit),
    );
  }
}

module.exports = new TrackRepository();
