// import express from "express";
// import upload from "../utils/multer.js";
// import { uploadMedia } from "../utils/cloudinary.js";

// const mediaRouter = express.Router();

// mediaRouter.post("/upload-video", upload.single("file"), async (req,res) => {
//     try {
//         const result = await uploadMedia(req.file.path);
//         res.status(200).json({
//             success: true,
//             message: "File uploaded successfully.",
//             data: result
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "Error uploading file"
//         })
        
//     }
// });

// export default mediaRouter;


import express from "express";
import upload from "../utils/multer.js";
import { uploadMedia } from "../utils/cloudinary.js";

const mediaRouter = express.Router();

mediaRouter.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Use the file buffer instead of path
    const result = await uploadMedia(req.file.buffer);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error uploading file",
      error: error.message
    });
  }
});

export default mediaRouter;
