const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");

const playlistRouter = Router();

playlistRouter.get('/playlist', authMiddleware, playlistController.getPlaylist)

module.exports = {
  playlistRouter: playlistRouter,
};
