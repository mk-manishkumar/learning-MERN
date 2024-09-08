const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");
const bcrypt = require("bcrypt");

const port = 3000;

const userModel = require("./models/user");
const postModel = require("./models/post");

const upload = require("./config/multerconfig");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  res.render("profile", { user });
});

app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");

  res.render("edit", { post });
});

app.get("/profile/upload", isLoggedIn, (req, res) => {
  res.render("profilepicupload");
});

app.post("/register", async (req, res) => {
  let { email, password, name, username, age } = req.body;

  let existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(500).send("User Already Registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send("Error during password hashing");

      // Create user and store the created user
      let newUser = await userModel.create({
        username,
        name,
        email,
        age,
        password: hash,
      });

      let token = jwt.sign({ email: email, userid: newUser._id }, "cvbnm");
      res.cookie("token", token);
      return res.redirect("/profile"); // Use return here to prevent further execution
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Something went wrong...");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "cvbnm");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;

  let post = await postModel.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/update/:id", isLoggedIn, async (req, res) => {
  await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.content });
  res.redirect("/profile");
});

app.post("/profile/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.profilePic = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
  if (!req.cookies.token) return res.redirect("/login");

  try {
    let data = jwt.verify(req.cookies.token, "cvbnm");
    req.user = data;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
