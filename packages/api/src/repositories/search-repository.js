const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class SearchRepository {
  findAll(query) {
    return normalizeDBQuery(
      db.Track.find({ title: { $regex: query, $options: "i" } }),
    );
  }
}

module.exports = new SearchRepository();
