import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorCourses, getLectureById, getPublishedCourse, removeLecture, togglePublishCourse } from "../controllers/courseController.js";
import upload from "../utils/multer.js";

const courseRouter = express.Router();

courseRouter.post("/",isAuthenticated,createCourse);
courseRouter.get("/published-courses",isAuthenticated,getPublishedCourse);
courseRouter.get("/",isAuthenticated,getCreatorCourses);
courseRouter.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),editCourse);
courseRouter.get("/:courseId",isAuthenticated,getCourseById);
courseRouter.post("/:courseId/lecture",isAuthenticated,createLecture);
courseRouter.get("/:courseId/lecture",isAuthenticated,getCourseLecture);
courseRouter.post("/:courseId/lecture/:lectureId",isAuthenticated,editLecture);
courseRouter.delete("/lecture/:lectureId",isAuthenticated,removeLecture);
courseRouter.get("/lecture/:lectureId",isAuthenticated,getLectureById);
courseRouter.patch("/:courseId",isAuthenticated,togglePublishCourse);

export default courseRouter;