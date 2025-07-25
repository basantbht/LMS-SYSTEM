import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRouter from "./routes/userRoute.js";

dotenv.config( { quiet: true });

// call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 8001;

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // ✅ set your frontend origin explicitly
  credentials: true               // ✅ allow credentials (cookies, auth headers)
}));

// apis
app.use("/api/v1/user",userRouter);

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});