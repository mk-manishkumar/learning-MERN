import React from "react";
import Link from "next/link";

function Header() {
  return (
    <div className="h-16 bg-green-600 flex text-white items-center justify-between px-5">
      <Link href="/" className="text-4xl">Logo</Link>
      <div className="flex gap-8">
        <Link href="/About">About</Link>
        <Link href="/Product">Product</Link>
        <Link href="/Courses">Courses</Link>
      </div>
    </div>
  );
}

export default Header;
