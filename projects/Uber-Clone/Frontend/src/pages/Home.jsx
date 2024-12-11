import React from "react";

const Home = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-between flex-col">
        <img className="w-16 absolute left-5 top-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div>
          <h2>Get Started with Uber</h2>
          <button>Continue</button>
        </div>
      </div>
    </>
  );
};

export default Home;
