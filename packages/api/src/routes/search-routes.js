const Router = require("express").Router;

// const { authMiddleware } = require("../middlewares");
const { trackController } = require("../controllers");

const searchRouter = Router();

searchRouter.get("/search", trackController.getSongs);

module.exports = {
  searchRouter: searchRouter,
};
