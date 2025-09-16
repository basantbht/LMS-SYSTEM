import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCreatorCourses } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const courseRouter = express.Router();

courseRouter.post("/",isAuthenticated,createCourse);
courseRouter.get("/",isAuthenticated,getCreatorCourses);
courseRouter.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse);
courseRouter.get("/:courseId",isAuthenticated,getCourseById);
courseRouter.post("/:courseId/lecture",isAuthenticated,createLecture);

export default courseRouter;