import React, { useState } from "react";

// Heading Component
const Heading = () => {
  return <h1>Palindrome Checker App</h1>;
};

// InputBox Component
const InputBox = ({ inputContent, handleInputChange }) => {
  return <input type="text" placeholder="Enter your text here..." value={inputContent} onChange={(e) => handleInputChange(e.target.value)} />;
};

// ResultArea Component
const ResultArea = ({ inputContent }) => {
  const reverseInput = inputContent.split("").reverse().join("");
  const isPalindrome = inputContent.length > 0 && inputContent.toLowerCase() === reverseInput.toLowerCase();

  return (
    <div className="resultArea">
      <h2>
        Input: <span>{inputContent || "No Input"}</span>
      </h2>
      <h2>
        Reverse: <span>{reverseInput || "No Input"}</span>
      </h2>
      <h2>
        Result: <span>{inputContent ? (isPalindrome ? "Palindrome" : "Not Palindrome") : "Please enter some text"}</span>
      </h2>
    </div>
  );
};

// Layout Component
const Layout = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (value) => {
    setInput(value);
  };

  return (
    <div className="layout">
      <Heading />
      <InputBox inputContent={input} handleInputChange={handleInputChange} />
      <ResultArea inputContent={input} />
    </div>
  );
};

export default Layout;
