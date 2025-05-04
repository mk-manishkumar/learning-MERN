import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const AddTodos = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  return (
    <div className="form">
      <form onSubmit={addTodoHandler}>
        <input type="text" value={input} onChange={handleChange} placeholder="Enter a todo..." />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddTodos;
