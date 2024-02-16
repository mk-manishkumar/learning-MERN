// eslint-disable-next-line no-unused-vars
import React, { useRef } from "react";
import Card from "./Card";

function Foreground() {
  const ref = useRef(null);
  const data = [
    {
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" },
    },

    {
      desc: "It is a long established fact that a reader will be distracted by the readable content of a page.",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "blue" },
    },

    {
      desc: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      filesize: ".9mb",
      close: true,
      tag: { isOpen: true, tagTitle: "Download Now", tagColor: "green" },
    },
  ];
  return (
    <>
      <div ref={ref} className="fixed top-0 left-0 z-[3] w-full h-full flex gap-10 flex-wrap p-5">
        {data.map((item, index) => {
          return <Card data={item} reference={ref} />;
        })}
      </div>
    </>
  );
}

export default Foreground;
