import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRouter from "./routes/userRoute.js";
import courseRouter from "./routes/courseRoute.js";

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
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});