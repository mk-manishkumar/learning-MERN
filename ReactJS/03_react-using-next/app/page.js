"use client";
import React, { useState } from "react";
import Header from "@/Components/Header";

function page() {
  const [user, setuser] = useState("Manish");
  return (
    <>
      <Header user={user} />
    </>
  );
}

export default page;
