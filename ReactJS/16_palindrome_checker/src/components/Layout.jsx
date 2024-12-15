import React, { useState } from "react";

const Heading = () => {
  return <h1>Palindrome Checker App</h1>;
};

const InputBox = () => {
  return <input type="text" placeholder="Enter your text here...." />;
};

const ResultArea = () => {
  return (
    <div className="resultArea">
      <h2>
        Input: <span></span>
      </h2>
      <h2>
        Reverse: <span></span>
      </h2>
      <h2>
        Result: <span>kgbkj</span>
      </h2>
    </div>
  );
};

const Layout = () => {
  const [input, setInput] = useState("");

  return (
    <div className="layout">
      <Heading />
      <InputBox inputContent={input} />
      <ResultArea inputContent={input} />
    </div>
  );
};

export default Layout;
