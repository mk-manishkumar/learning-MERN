import dotenv from "dotenv";
import connectDB from "./db/db_index.js";
import { app } from "./app.js";

const port = process.env.PORT || 7000;

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection failed: ", err);
  });
