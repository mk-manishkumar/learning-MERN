"use client"
import React, { useState } from "react";

function Page() {
  // State to track the visibility of each FAQ item
  const [openIndex, setOpenIndex] = useState(null);

  // Function to toggle visibility of FAQ item
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div>
        <h1 className="mt-16 font-bold text-2xl text-center">Random FAQ's</h1>
      </div>
      <div className="w-[40%] mx-auto">
        {/* first*/}
        <div>
          <h2 onClick={() => toggleAccordion(0)} className="cursor-pointer">
            Who are we?
          </h2>
          {openIndex === 0 && <p>We enable upscaling careers through flexible, interactive and collaborative learning. We believe in building learning communities by bringing together mentors, young minds, and creators.</p>}
        </div>
        {/* second */}
        <div>
          <h2 onClick={() => toggleAccordion(1)} className="cursor-pointer">
            What do we do?
          </h2>
          {openIndex === 1 && <p>Building learning communities with Our Affordable & Competent Courses.</p>}
        </div>
        {/* third*/}
        <div>
          <h2 onClick={() => toggleAccordion(2)} className="cursor-pointer">
            Are the community classes boring?
          </h2>
          {openIndex === 2 && <p>No, not at all!!!</p>}
        </div>
      </div>
    </>
  );
}

export default Page;
