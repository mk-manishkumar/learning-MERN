import { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";
import { fetchTodos, createTodo, deleteTodo } from "./api/todoApi";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Fetch all todos from backend
  useEffect(() => {
    const loadTodos = async () => {
      const res = await fetchTodos();
      setTodos(res.data);
    };
    loadTodos();
  }, []);

  // Add new todo to backend
  const addTodoHandler = async (text: string) => {
    const res = await createTodo(text);
    setTodos((prev) => [...prev, res.data.newTodo]);
  };

  // Remove todo from backend
  const removeTodoHandler = async (todoId: string) => {
    await deleteTodo(todoId);
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  return (
    <main className="max-w-6xl mx-auto my-10 px-5 md:px-0">
      <AddTodo onAddTodo={addTodoHandler} />
      <TodoList items={todos} onRemoveTodo={removeTodoHandler} />
    </main>
  );
}

export default App;
