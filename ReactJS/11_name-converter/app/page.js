"use client";
import React, { useState } from "react";

function Page() {
  const [camel_Case, setcamelCase] = useState("");
  const [pascal_Case, setpascalCase] = useState("");
  const [snake_Case, setsnakeCase] = useState("");
  const [screaming_Snake_Case, setscreamingSnakeCase] = useState("");
  const [kebab_Case, setkebabCase] = useState("");
  const [screaming_Kebab_Case, setscreamingKebabCase] = useState("");
  let [input, setinput] = useState("");

  function camelCase() {
    let inbox = input;

    let words = inbox.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (i === 0) {
        words[i] = words[i].toLowerCase();
      } else {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
      }
    }

    let camelCasedText = words.join("");
    setcamelCase(camelCasedText);
  }

  function pascalCase() {
    let inbox = input;

    let words = inbox.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    let pascalCasedText = words.join("");
    setpascalCase(pascalCasedText);
  }

  function snakeCase() {
    let inbox = input;
    let words = inbox.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].toLowerCase();
    }

    let snakeCasedText = words.join("_");
    setsnakeCase(snakeCasedText);
  }

  function screamingSnakeCase() {
    let inbox = input;
    let words = inbox.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].toUpperCase();
    }

    let screamingSnakeCasedText = words.join("_");
    setscreamingSnakeCase(screamingSnakeCasedText);
  }

  function kebabCase() {
    let inbox = input;
    let words = inbox.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].toLowerCase();
    }

    let kebabCasedText = words.join("-");
    setkebabCase(kebabCasedText);
  }

  function screamingKebabCase() {
    let inbox = input;
    let words = inbox.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].toUpperCase();
    }

    let screamingKebabCasedText = words.join("-");
    setscreamingKebabCase(screamingKebabCasedText);
  }

  function convertAll() {
    camelCase();
    pascalCase();
    snakeCase();
    screamingSnakeCase();
    kebabCase();
    screamingKebabCase();
  }
  return (
    <>
      <div className="mt-5 w-full flex flex-col items-center gap-5">
        <input
          className="w-96 p-2 rounded-3xl outline-none"
          type="text"
          placeholder="Enter the Text"
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
        <button onClick={convertAll} className="bg-gray-200 py-1 px-5 rounded-3xl shadow-lg font-semibold">
          Convert
        </button>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <button className="btn">
          Camel Case: <span>{camel_Case}</span>
        </button>
        <button className="btn">
          Pascal Case: <span>{pascal_Case}</span>
        </button>
        <button className="btn">
          Snake Case: <span>{snake_Case}</span>
        </button>
        <button className="btn">
          Screaming Snake Case: <span>{screaming_Snake_Case}</span>
        </button>
        <button className="btn">
          Kebab Case: <span>{kebab_Case}</span>
        </button>
        <button className="btn">
          Screaming Kebab Case: <span>{screaming_Kebab_Case}</span>
        </button>
      </div>
    </>
  );
}

export default Page;
