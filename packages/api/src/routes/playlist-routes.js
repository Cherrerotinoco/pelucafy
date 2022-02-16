const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { playlistController } = require("../controllers");

const playlistRouter = Router();

playlistRouter.post(
  "/playlist",
  authMiddleware,
  playlistController.uploadPlaylist,
);
playlistRouter.get("/playlist", playlistController.getPlaylists);
playlistRouter.put(
  "/playlist",
  authMiddleware,
  playlistController.updatePlaylist,
);

playlistRouter.delete("/playlist/:id", playlistController.deletePlaylist);

playlistRouter.post("/playlist/follows", playlistController.followUnfollow);

module.exports = {
  playlistRouter: playlistRouter,
};
