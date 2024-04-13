require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./db.js");
const router = require("./routes/index.routes.js");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the Router
app.use("/api/v1", router);

// listen server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
