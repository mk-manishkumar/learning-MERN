"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

function page() {
  const [users, setusers] = useState([]);
  const getUsers = async () => {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
    setusers(data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <button onClick={getUsers} className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold m-5">
        Get Data
      </button>
      <div className="p-8 bg-slate-300 mt-5">
        <ul>
          {users.map((e) => {
            return (
              <li>
                {e.username} --- <a href={`/${e.id}`}>Explore</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default page;
