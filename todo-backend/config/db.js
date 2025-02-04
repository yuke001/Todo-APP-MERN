import mongoose from "mongoose";

async function connectDB() {
    try {
        let conn = await mongoose.connect("mongodb://127.0.0.1:27017/TodoMERN_DB");
        console.log(`DB is connected on ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
