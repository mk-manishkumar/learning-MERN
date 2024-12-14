import React, { useState } from "react";

// Functional Components
const Heading = () => {
  return <h1>See What You Type</h1>;
};

const TextArea = ({ typingContent, handleTypingChange }) => {
  return <textarea className="textarea" value={typingContent} onChange={(e) => handleTypingChange(e.target.value)} />;
};

const DisplayArea = ({ typingContent }) => {
  return (
    <div className="displayArea">
      <h3>Your Text :</h3>
      <div className="result">
        <p>{typingContent || "Input Box Is Empty... Start Typing"}</p>
      </div>
    </div>
  );
};

const Layout = () => {
  const [typingContent, setTypingContent] = useState("");

  const handleTypingChange = (value) => {
    setTypingContent(value);
  };

  return (
    <div className="layout">
      <Heading />
      <TextArea typingContent={typingContent} handleTypingChange={handleTypingChange} />
      <DisplayArea typingContent={typingContent} />
    </div>
  );
};

export default Layout;
