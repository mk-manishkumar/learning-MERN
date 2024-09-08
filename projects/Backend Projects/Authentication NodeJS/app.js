const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");

const userModel = require("./models/user");

const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  const { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      let token = jwt.sign({ email }, "dfghj");
      res.cookie("token", token);
    });
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("/login");
});

app.post("/login", async (req, res) => {
  let user = await user.findOne({ email: req.body.email });

  !user && res.send("Something is wrong");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({email: user.email }, "dfghj");
      res.cookie("token", token);
      res.send("LoggedIn");
    } else res.send("Something is wrong");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
