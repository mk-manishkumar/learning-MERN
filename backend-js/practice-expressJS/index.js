const express = require("express");
const app = express();
const port = 3000;

function handlesum(req,res) {
  let a = req.query.counter;
  let count = 0;
  for (let i = 1; i <= a; i++) {
    count = count + i;
  }
  res.send(count.toString());
}

app.get("/handlesum", handlesum);
// app.post("/handlesum", handlesum);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
