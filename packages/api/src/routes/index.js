const { userRouter } = require("./user-routes");
const { trackRouter } = require("./track-routes");
const { playlistRouter } = require("./playlist-routes");
const { searchRouter } = require("./search-routes");

module.exports = {
  userRouter: userRouter,
  trackRouter: trackRouter,
  playlistRouter: playlistRouter,
  searchRouter: searchRouter,
};
