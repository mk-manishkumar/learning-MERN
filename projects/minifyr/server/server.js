import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/monogo.config.js";
import shortUrl from "./src/routes/shortUrl.route.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import { attachUser } from "./src/utils/attachUser.js";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";
import { redirectFromShortUrl } from "./src/controller/shortUrl.controller.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(attachUser)

// routes
app.use("/api/create", shortUrl);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.get("/:id", redirectFromShortUrl);

// error handling
app.use(errorHandler);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on http://localhost:3000");
});
