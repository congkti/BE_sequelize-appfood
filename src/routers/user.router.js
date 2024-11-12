import express from "express";
import userController from "../controllers/user.controller.js";

const userRouter = express.Router();

// get all user
userRouter.get("/getAllUsers", userController.getAllUsers);

export default userRouter;
