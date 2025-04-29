import React, { useEffect, useState } from "react";
import supabase from "./supabase-client";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");

    if (error) {
      console.error("Error fetching:", error);
    } else {
      setTodoList(data);
    }
  };

  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };
    const { data, error } = await supabase.from("TodoList").insert([newTodoData]).single();

    if (error) {
      console.error("Error adding todo:", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  const completeTask = async (id, isCompleted) => {
    const { data, error } = await supabase.from("TodoList").update({ isCompleted: !isCompleted }).eq("id", id);

    if (error) {
      console.error("Error toggling task:", error);
    } else {
      const updatedTodoList = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !isCompleted };
        }
        return todo;
      });
      setTodoList(updatedTodoList);
    }
  };

  const deleteTask = async (id) => {
    const { data, error } = await supabase.from("TodoList").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="New Todo..." value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button onClick={addTodo}>Add Todo Item</button>
      </div>

      <ul>
        {todoList.map((todo) => (
          <li key={todo.id}>
            <p>{todo.name}</p>
            <button onClick={() => completeTask(todo.id, todo.isCompleted)}>{todo.isCompleted ? "Undo" : "Complete task"}</button>
            <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
