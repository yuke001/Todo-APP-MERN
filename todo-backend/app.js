import express from 'express';
import connectDB from './config/db.js';
import todoRouter from './routes/todoRoutes.js';

let app = express();

// Call the database connection function
connectDB();

app.use(express.json());

app.use("/api", todoRouter);

export default app;
