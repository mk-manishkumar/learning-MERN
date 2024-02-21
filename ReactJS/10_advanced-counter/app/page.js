"use client";
import React, { useState } from "react";

function Page() {
  const [count, setCount] = useState(0);
  const [textColor, setTextColor] = useState("black");
  let [countJump, setCountJump] = useState(1);

  function changeTextColor(newCount) {
    if (newCount > 0) {
      setTextColor("green");
    } else if (newCount < 0) {
      setTextColor("red");
    } else {
      setTextColor("black");
    }
  }

  function increaseCount() {
    setCount((prevCount) => {
      const newCount = prevCount + countJump;
      changeTextColor(newCount);
      return newCount;
    });
  }

  function decreaseCount() {
    setCount((prevCount) => {
      const newCount = prevCount - countJump;
      changeTextColor(newCount);
      return newCount;
    });
  }

  function resetCount() {
    setCount(0);
    changeTextColor(0);
  }

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-zinc-600">
        <div className="text-center bg-purple-800 text-white p-10 rounded-lg shadow-lg">
          <div className="flex justify-between gap-10">
            <div className="bg-gray-200 text-black px-2 text-3xl rounded-lg font-bold" style={{ color: textColor }}>
              {count}
            </div>
            <input
              type="number"
              className="p-2 outline-none rounded-lg text-black text-center"
              value={countJump}
              onChange={(e) => {
                setCountJump(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="flex gap-10 mt-8">
            <button onClick={increaseCount} className="bg-gray-200 text-black py-1 px-3 rounded-lg font-semibold">
              Increase
            </button>
            <button onClick={resetCount} className="bg-gray-200 text-black py-1 px-3 rounded-lg font-semibold">
              Reset
            </button>
            <button onClick={decreaseCount} className="bg-gray-200 text-black py-1 px-3 rounded-lg font-semibold">
              Decrease
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
