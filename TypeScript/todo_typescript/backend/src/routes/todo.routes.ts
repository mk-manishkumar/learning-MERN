import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo.controllers";

const router = express.Router();

router.route("/").post(createTodo) 
router.route("/").get(getTodo) 
router.route("/:todoId").patch(updateTodo) 
router.route("/:todoId").delete(deleteTodo) 

export default router;