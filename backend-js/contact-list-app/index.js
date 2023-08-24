const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

const contacts = []; // In-memory data storage

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.render("index", { contacts });
});

app.get("/contact/:id", (req, res) => {
  const contact = contacts[req.params.id];
  res.render("contact", { contact });
});

app.get("/add", (req, res) => {
  res.render("add-contact");
});

app.post("/add", (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = { name, email, phone };
  contacts.push(newContact);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const contact = contacts[req.params.id];
  res.render("edit-contact", { contact, id: req.params.id });
});

app.post("/edit/:id", (req, res) => {
  const { name, email, phone } = req.body;
  const contact = contacts[req.params.id];
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  contacts.splice(req.params.id, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
