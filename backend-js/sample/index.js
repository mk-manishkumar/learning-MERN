const express = require("express");
const app = express();
const port = 3000;

function totalSum(counter) {
  for (let i = 1; i <= 100; i++) {
    counter += i;
  }
  return counter;
}

app.get("/totalsum", (req, res) => {
  let answer = totalSum(0);
  res.send(answer.toString()); // Convert answer to string before sending otherwise  it will interpret the number as an HTTP status code, and that's why I was encountering the error "Invalid status code: 5050".
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
