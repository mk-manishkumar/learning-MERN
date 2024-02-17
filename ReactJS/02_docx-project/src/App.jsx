// eslint-disable-next-line no-unused-vars
import React from "react";
import Background from "./components/Background";
import Foreground from "./components/Foreground";

function App() {
  return (
    <div className="w-full h-screen bg-zinc-800">
      <Background />
      <Foreground />
    </div>
  );
}

export default App;
