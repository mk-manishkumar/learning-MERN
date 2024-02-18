"use client";
import React, { useState } from "react";

function page() {
  const [username, setUsername] = useState("");
  return (
    <>
      {/* Two-way binding */}
      {/*
  <form action="">
    <input
      type="text"
      className="border-2 m-5 outline-none border-gray-600"
      value={username}
      onChange={(e) => {
        setUsername(e.target.value);
      }}
    />
  </form>
*/}

      <h1 className="text-3xl font-bold">This is home page</h1>
      <a href="/Contact">Contact</a>
    </>
  );
}

export default page;
