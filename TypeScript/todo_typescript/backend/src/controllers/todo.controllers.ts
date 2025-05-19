import { RequestHandler } from "express";
import { Todo } from "../models/todo.model";
import { readTodosFromFile, writeTodosToFile } from "../utils/fileHandler";

// create todo
export const createTodo: RequestHandler = async (req, res) => {
  const text = (req.body as { text: string }).text;

  if (!text || text.trim().length === 0) {
    res.status(400).json({ message: "Todo text cannot be empty." });
    return;
  }

  const todos = await readTodosFromFile();

  const newTodo = new Todo(Math.random().toString(), text);
  todos.push(newTodo);

  await writeTodosToFile(todos);

  res.status(201).json({ message: "Todo created.", newTodo });
};

// get all todos
export const getTodo: RequestHandler = async (_, res) => {
  const todos = await readTodosFromFile();
  res.status(200).json(todos);
};

// update todo
export const updateTodo: RequestHandler<{ todoId: string }> = async (req, res) => {
  const { todoId } = req.params;
  const { text } = req.body as { text: string };

  if (!text || text.trim().length === 0) {
    res.status(400).json({ message: "Todo text cannot be empty." });
    return;
  }

  const todos = await readTodosFromFile();

  const todoIndex = todos.findIndex((todo: Todo) => todo.id === todoId);

  if (todoIndex < 0) {
    res.status(404).json({ message: "Todo not found." });
    return;
  }

  todos[todoIndex].text = text;

  await writeTodosToFile(todos);

  res.status(200).json({ message: "Todo updated.", updatedTodo: todos[todoIndex] });
};

// delete todo 
export const deleteTodo: RequestHandler<{ todoId: string }> = async (req, res) => {
  const { todoId } = req.params;

  const todos = await readTodosFromFile();

  const todoIndex = todos.findIndex((todo: Todo) => todo.id === todoId);

  if (todoIndex < 0) {
    res.status(404).json({ message: "Todo not found." });
    return;
  }

  todos.splice(todoIndex, 1);

  await writeTodosToFile(todos);

  res.status(200).json({ message: "Todo deleted." });
};
