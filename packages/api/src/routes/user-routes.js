const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");
const { emailChangeMiddelware } = require("../middlewares/email-middleware");

const userRouter = Router();

userRouter.post("/sign-up", authMiddleware, userController.signUp);
userRouter.post("/sign-out", authMiddleware, userController.signOut);

userRouter.put("/account", authMiddleware, emailChangeMiddelware, userController.update);


module.exports = {
  userRouter: userRouter,
};
