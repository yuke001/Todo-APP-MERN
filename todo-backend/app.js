import express from "express";
import connectDB from "./config/db.js";
import todoRouter from "./routes/todoRoutes.js";
import cors from "cors";
import * as dotenv from "dotenv"; 

dotenv.config(); 

// Configure CORS based on environment
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = isProduction
  ? [process.env.APPLICATION_URL]
  : ["http://localhost:5173"]; // Replace with your Vercel URL

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Keep this line if you want to explicitly specify the allowed methods
};

let app = express();

// Call the database connection function
connectDB();

// middleware
app.use(express.json());

app.use(cors(corsOptions));

//routes
app.use("/api", todoRouter);

export default app;
