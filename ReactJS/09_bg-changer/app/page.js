"use client";
import React, { useState } from "react";

function page() {
  const [bgColor, setbgColor] = useState("#fff");

  function changeColor() {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .toUpperCase();
    setbgColor(`#${randomColor}`);
  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center main" style={{ backgroundColor: `${bgColor}` }}>
        <div className="box bg-[#3061a8] p-12 flex flex-col items-center text-center gap-2">
          <p className="bg-yellow-600 p-4 rounded-md">{bgColor}</p>
          <button onClick={changeColor} className="px-4 py-2 bg-[#808080] text-2xl font-semibold mt-4 rounded-lg">
            Change Background Color
          </button>
        </div>
      </div>
    </>
  );
}

export default page;
