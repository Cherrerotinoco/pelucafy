const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const trackRouter = Router();

trackRouter.post("/tracks", authMiddleware, trackController.uploadSong);

module.exports = {
  trackRouter: trackRouter,
};
