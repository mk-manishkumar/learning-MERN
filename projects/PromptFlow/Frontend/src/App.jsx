import { useState } from "react";
import { fetchGeneratedContent } from "./services/api";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await fetchGeneratedContent(question);
    setResponse(result);
  };

  return (
    <div>
      <h1>
        Hi, I'm <span>PromptFlow</span>.
      </h1>
      <h3>How can I help you today?</h3>
      <form onSubmit={handleSubmit}>
        <textarea type="text" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask something..." />
        <button type="submit">Generate</button>
      </form>
      <div className="response-section">
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
