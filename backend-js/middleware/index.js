const express = require("express");
const app = express();
const port = 3000;

// Custom middleware to attach the sum function to the request object
function handleSum(req, res, next) {
  req.calculateSum = (number) => {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
      sum += i;
    }
    return sum;
  };
  next();
}

// Register the custom middleware
app.use(handleSum);

// Example route that uses the sum calculation function
app.get("/calculateSum/:number", (req, res) => {
  const number = parseInt(req.params.number);

  if (isNaN(number) || number <= 0) {
    return res
      .status(400)
      .send("Invalid input. Please provide a positive integer.");
  }

  const sum = req.calculateSum(number);
  res.send(`Sum of numbers from 1 to ${number} is ${sum}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
