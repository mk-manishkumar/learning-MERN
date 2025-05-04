import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();

  return (
    <>
      <div className="head">MyTodos</div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <div className="list">
            <h3>{todo.text}</h3>
            <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Todos;
