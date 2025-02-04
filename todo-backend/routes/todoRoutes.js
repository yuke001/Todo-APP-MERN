import express from 'express';
import { getTodoById, getTodos, postTodo } from "../controllers/todoController.js"

let router = express.Router();

router.post("/todos",  postTodo);
router.get("/todos",  getTodos);
router.get("/todos/:id",  getTodoById);


export default router;