const express = require("express");
const app = express();
const PORT = 3030;

// Use the 'public' directory to serve static files (CSS, images, etc.)
app.use(express.static("public"));

// Use the 'views' directory for template files
app.set("views", "./views");
app.set("view engine", "ejs"); // Set the template engine to EJS

// Sample task data
const tasks = [];

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

app.post("/add", (req, res) => {
  const newTask = req.query.task;
  tasks.push(newTask);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
