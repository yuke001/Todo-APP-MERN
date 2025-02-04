import mongoose from "mongoose";

let todoSchema = new mongoose.Schema(
  {
  
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }

  )

  let Todo = mongoose.model("todo", todoSchema);

export default Todo;