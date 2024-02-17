"use client";
import React, { useState } from "react";

function page() {
  const [task, setTask] = useState("");
  const [desc, setdesc] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { task, desc }]);
    setTask("");
    setdesc("");
  };

  const deleteHandler = (index) => {
    let copyTask = [...mainTask];
    copyTask.splice(index, 1);
    setMainTask(copyTask);
  };

  let renderTask = <h2>No Task Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, index) => {
      return (
        <li key={index} className="flex items-center justify-between mb-5 bg-yellow-300 p-4">
          <div className="flex items-center justify-between  w-[50%]">
            <h5 className="text-2xl font-semibold">{t.task}</h5>
            <h6 className="text-xl">{t.desc}</h6>
          </div>
          <button
            onClick={() => {
              deleteHandler(index);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-bold"
          >
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="bg-zinc-800 text-white p-5 text-4xl font-semibold">Todo List</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2 outline-none rounded-md"
          placeholder="Enter Task here"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2 outline-none rounded-md"
          placeholder="Enter Description here"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
        <button className="bg-zinc-800 text-white text-2xl px-4 py-2 font-bold rounded-md ml-5">Add Task</button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
}

export default page;
