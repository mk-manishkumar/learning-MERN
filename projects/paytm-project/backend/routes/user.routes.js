const express = require("express");
const zod = require("zod");
const { user } = require("../db.js");
const jwt = require("jsonwebtoken");
const router = require("./index.routes.js");

const userRouter = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

const signUpSchema = zod.object({
  username: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

// signup router
userRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    console.log(body.username);
    const result = await user.findOne({ username: body.username });

    if (result) {
      return res.json({
        message: "User already exists by this username!",
      });
    }

    const parsedData = signUpSchema.safeParse(body);
    if (!parsedData.success) {
      return res.status(400).json({ message: "Invalid user data", errors: parsedData.error });
    }

    const newUser = await user.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
      },
      JWT_SECRET
    );

    res.status(200).json({
      message: `User created successfully. Your userID is ${newUser._id}`,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// login router
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await user.findOne({
      username,
    });

    if (!result) {
      return res.status(409).json({
        message: "User doesn't exist!",
      });
    }

    res.status(200).json({
      username,
      password,
    });
  } catch (error) {
    res.status(411).json({
      message: error.message,
    });
  }
});

module.exports = userRouter;
