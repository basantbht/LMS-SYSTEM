import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse } from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/",isAuthenticated,createCourse);

export default courseRouter;