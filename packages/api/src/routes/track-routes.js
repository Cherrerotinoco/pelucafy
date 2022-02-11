const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.uploadSong);
trackRouter.get("/tracks", trackController.getSongs);
trackRouter.put("/tracks", authMiddleware, trackController.updateSong);

//meter middleware auth en delete
trackRouter.delete("/tracks/:id", trackController.deleteSong);

trackRouter.post("/tracks/likes", trackController.addLike);
trackRouter.delete("/tracks/likes", trackController.deleteLike);

/*
trackRouter.put("/albums", trackController.updateLikes);
trackRouter.put("/playlist", trackController.updateLikes);
*/

module.exports = {
  trackRouter: trackRouter,
};
