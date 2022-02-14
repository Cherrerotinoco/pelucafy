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

//meter middleware auth en delete
playlistRouter.delete("/playlist/:id", playlistController.deletePlaylist);

playlistRouter.post("/playlist/follows", playlistController.followUnfollow);

/*
playlistRouter.put("/albums", playlistController.updateLikes);
playlistRouter.put("/playlist", playlistController.updateLikes);
*/

module.exports = {
  playlistRouter: playlistRouter,
};
