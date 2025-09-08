import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, getCreatorCourses } from "../controllers/courseController.js";

const courseRouter = express.Router();

courseRouter.post("/",isAuthenticated,createCourse);
courseRouter.get("/",isAuthenticated,getCreatorCourses);

export default courseRouter;