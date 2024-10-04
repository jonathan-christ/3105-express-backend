import express from "express";
import { UserController } from "../controllers/userController.ts";
import { authMiddleware } from "../middleware/authMiddleware.ts";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/profile", authMiddleware, userController.profile);

export { userRouter };