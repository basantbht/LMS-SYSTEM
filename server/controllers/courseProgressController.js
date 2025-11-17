import courseModel from "../models/courseModel.js";
import courseProgressModel from "../models/courseProgressModel.js";

export const getCourseProgress = async (req,res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;
        console.log(courseId,userId)

        // Step 1 - Fetch the user course progress
        let courseProgress = await courseProgressModel.findOne({courseId,userId}).populate("courseId");

        const courseDetails = await courseModel.findById(courseId).populate("lectures");

        if(!courseDetails){
            return res.status(400).json({
                message: "Course not found!"
            })
        }

        // Step 2 - If no progress found, return course details with an empty progress
        if(!courseProgress){
             return res.status(200).json({
                data:{
                    courseDetails,
                    progress:[],
                    completed: false
                }
            })
        }

        // Step 3 - Return the user's course progress along with course details
         return res.status(200).json({
                data:{
                    courseDetails,
                    progress:courseProgress.lectureProgress
                    ,
                    completed: courseProgress.completed
                }
            })

    } catch (error) {
        console.log(error);
    }
}

export const updateLectureProgress = async (req,res) => {
    try {
        const {courseId, lectureId} = req.params;
        const userId = req.id;

        // fetch or create course progres
        let courseProgress = await courseProgressModel.findOne({courseId,userId}).populate("courseId");
        
        if(!courseProgress){
            // If no progress exist, create a new record
            courseProgress = new courseProgressModel({
                userId,
                courseId,
                completed: false,
                lectureProgress:[],
            });
        }

        // find the lecture progress in the course progress
        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId);

        if(lectureIndex !== -1){
            // if lecture already exist, update its status
            courseProgress.lectureProgress[lectureIndex].viewed = true;
        } else {
            // Add new lecture progress
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true,
            })
        }

        // if all lecture is complete
        const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed).length;

        const course = await courseModel.findById(courseId);

        if(course.lectures.length === lectureProgressLength) courseProgress.completed = true;
        
        await courseProgress.save();
        
        return res.status(200).json({
            message: "Lecture progress updated successfully."
        });

    } catch (error) {
        console.log(error);
    }
}

export const markAsCompleted = async (req,res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;

        const courseProgress = await courseProgressModel.findOne({courseId, userId});

        if(!courseProgress) return res.status(404).json({message: "Course progress not found"});

        courseProgress.lectureProgress.map((lectureProgress) => lectureProgress.viewed = true);

        courseProgress.completed = true;

        await courseProgress.save();

        return res.status(200).json({
            message: "Course marked as completed."
        });
        
    } catch (error) {
        console.log(error);
          return res.status(500).json({ message: error.message });

    }
}

export const markAsInCompleted = async (req,res) => {
    try {
        const {courseId} = req.params;
        const userId = req.id;

        const courseProgress = await courseProgressModel.findOne({courseId, userId});

        if(!courseProgress) return res.status(404).json({message: "Course progress not found"});

        courseProgress.lectureProgress.map((lectureProgress) => lectureProgress.viewed = false);

        courseProgress.completed = false;

        await courseProgress.save();

        return res.status(200).json({
            message: "Course marked as incompleted."
        });
        
    } catch (error) {
        console.log(error);
          return res.status(500).json({ message: error.message });

    }
}