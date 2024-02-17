"use client";
import axios from "axios";
import React, { useState } from "react";

function page() {
  const [images, setImages] = useState([]);
  const getImages = async () => {
    try {
      const res = await axios.get("https://picsum.photos/v2/list");
      const data = res.data;
      setImages(data);
    } catch (error) {
      console.error("Error Fetching Images");
    }
  };
  return (
    <>
      <button onClick={getImages} className="px-5 py-3 bg-green-600 text-white font-bold rounded-md m-4">
        Get Images
      </button>
      <div className="p-10 flex justify-between flex-wrap">
        {images.map((elem, i) => {
          return <img key={i} src={elem.download_url} width={300} height={300} className="m-10 rounded-md" />;
        })}
      </div>
    </>
  );
}

export default page;
