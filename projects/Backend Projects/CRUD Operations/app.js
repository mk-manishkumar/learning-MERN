const express = require("express");
const path = require("path");
const userModel = require("./models/user");
const slugify = require("slugify");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Read all users
app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.render("read", { users });
});

// Delete user
app.get("/delete/:id", async (req, res) => {
  await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

// Edit user form
app.get("/edit/:userid", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

// Edit user submission
app.post("/edit/:userid", async (req, res) => {
  let { name, email, image, description } = req.body;

  // Slugify the name for URL-friendly slug
  let slug = slugify(name, { lower: true, strict: true });

  await userModel.findOneAndUpdate({ _id: req.params.userid }, { name, email, image, description, slug }, { new: true });
  res.redirect("/read");
});

// Create user
app.post("/create", async (req, res) => {
  let { name, email, image, description } = req.body;

  // Slugify the name for URL-friendly slug
  let slug = slugify(name, { lower: true, strict: true });

  await userModel.create({
    name,
    email,
    image,
    description,
    slug,
  });
  res.redirect("/read");
});

// Profile page by slug 
app.get("/profile/:slug", async (req, res) => {
  console.log(req.params.slug);
  let user = await userModel.findOne({ slug: req.params.slug });
  if (!user) {
    return res.status(404).send("User not found");
  }
  res.render("profile", { user });
});

// Server listening on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
