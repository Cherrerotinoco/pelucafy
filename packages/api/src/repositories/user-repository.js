const db = require("../models");
const normalizeDBQuery = require("../utils/normalizeDBQuery");

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(db.User.findOne(query, "-__v"));
  }
  findAndUpdate(query, update) {
    return normalizeDBQuery(db.User.findOneAndUpdate(query, update));
  }
}

module.exports = new UserRepository();
