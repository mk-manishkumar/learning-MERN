import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { urlShort, getOriginalUrl } from "./controllers/controller.js";

const app = express();
const port = 3000;

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", { shortUrl: null });
});

// handle url submission
app.post("/shorten", urlShort);

// redirect to original url using short url
app.get("/:shortCode", getOriginalUrl);

app.listen(port, () => console.log(`Server running on ${port}`));
