import React from "react";

function Header(props) {
  return (
    <div className="h-16 bg-green-600 flex text-white items-center justify-between px-5">
      <h2 className="text-4xl">{props.user}</h2>
      <div className="flex gap-8">
        <h4>About</h4>
        <h4>Career</h4>
        <h4>Blogs</h4>
        <h4>Contact</h4>
      </div>
    </div>
  );
}

export default Header;
