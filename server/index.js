import express from "express"
import dotenv from "dotenv";
import serverless from "serverless-http";

import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";
import mediaRouter from "./routes/mediaRoute.js";
import coursePurchaseRouter from "./routes/coursePurchaseRoute.js";
import courseProgressRouter from "./routes/courseProgressRoute.js";

dotenv.config( { quiet: true });

// call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 8001;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true              
}));

// apis
app.use("/api/v1/media", mediaRouter)
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/purchase",coursePurchaseRouter);
app.use("/api/v1/progress",courseProgressRouter);

app.get("/", (req,res) => {
  res.send("API working")
})

export default serverless(app);