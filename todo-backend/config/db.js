import mongoose from "mongoose";
import * as dotenv from 'dotenv' 

dotenv.config()

async function connectDB() {
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB is connected on ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
