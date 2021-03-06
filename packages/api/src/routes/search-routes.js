const Router = require("express").Router;

// const { authMiddleware } = require("../middlewares");
const { searchController } = require("../controllers");

const searchRouter = Router();

searchRouter.get("/search", searchController.searchAll);

module.exports = {
  searchRouter: searchRouter,
};
