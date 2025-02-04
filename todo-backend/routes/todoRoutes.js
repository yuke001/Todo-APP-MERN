import express from "express";
import {
    deleteTodo,
  getTodoById,
  getTodos,
  postTodo,
  putTodo,
} from "../controllers/todoController.js";

let router = express.Router();

router.post("/todos", postTodo);
router.get("/todos", getTodos);
router.get("/todos/:id", getTodoById);
router.put("/todos/:id", putTodo);
router.delete("/todos/:id", deleteTodo);

export default router;
