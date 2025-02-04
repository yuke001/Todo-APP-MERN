import express from "express";
import connectDB from "./config/db.js";
import todoRouter from "./routes/todoRoutes.js";
import cors from "cors";

let app = express();

// Call the database connection function
connectDB();

// middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/api", todoRouter);

export default app;
