const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.uploadSong);
trackRouter.get("/tracks", trackController.getSongs);
trackRouter.put("/tracks", authMiddleware, trackController.updateSong);

trackRouter.delete("/tracks/:id", trackController.deleteSong);

trackRouter.post("/tracks/likes", trackController.likeDislike);

module.exports = {
  trackRouter: trackRouter,
};
