const { log } = require("console");
const fs = require("fs");

let addedData = "Good Morning, Everybody!";

fs.writeFile("a.txt", addedData, (err, data) => {
  if (err) {
    console.error("Error writing to the file:", err);
  } else {
    console.log(`Data has been written to a.txt\n`);
  }
});

let appendData = "\nWelcome Aboard!"

fs.appendFile("a.txt", appendData, (err, data) => {
    console.log("\nDone");
})

fs.readFile("a.txt", "utf8", (err, data) => {
  console.log(data);
});
