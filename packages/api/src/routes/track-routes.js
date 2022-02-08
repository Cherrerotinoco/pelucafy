const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.uploadSong);
trackRouter.get("/tracks", trackController.getSongs);
trackRouter.put("/tracks", authMiddleware, trackController.updateSong);

module.exports = {
  trackRouter: trackRouter,
};
