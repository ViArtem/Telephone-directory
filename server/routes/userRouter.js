import { Router } from "express";
import userController from "../controllers/userController.js";
import multer from "../middleware/imageMiddleware.js";
const userRouter = new Router();

userRouter.post("/user/authorization", userController.authorizationUser);

userRouter.post(
  "/user/registration",
  userController.registrationUser //  multer.single("avatar"),
);

userRouter.post("/user/change/avatar", userController.changeAvatar);

userRouter.post("/user/refresh", userController.refresh);

export { userRouter };
