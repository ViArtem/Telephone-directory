import { Router } from "express";
import userController from "../controllers/userController.js";
import multer from "../middleware/imageMiddleware.js";
const userRouter = new Router();

userRouter.post("/user/authorization", userController.authorizationUser);

userRouter.post(
  "/user/registration",
  multer.single("avatar"),
  userController.registrationUser
);

userRouter.post("/user/refresh", userController.refresh);

export { userRouter };
