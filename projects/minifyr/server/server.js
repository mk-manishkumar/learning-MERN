import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config("./.env");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
