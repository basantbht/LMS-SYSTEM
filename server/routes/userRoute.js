import express from "express";
import { getUserProfile, login, logout, register, updateProfile } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/profile",isAuthenticated, getUserProfile);
userRouter.put("/profile/update",isAuthenticated,upload.single("profilePhoto"), updateProfile);

export default userRouter;