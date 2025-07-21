import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js";

dotenv.config( { quiet: true });

// call database connection here
connectDB();

const app = express();
const PORT = process.env.PORT || 8001;

app.listen(PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});