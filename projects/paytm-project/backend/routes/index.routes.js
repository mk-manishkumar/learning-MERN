const express = require("express");
const userRouter = require("./user.routes.js");

const router = express.Router();

router.use("/user", userRouter);

module.exports = router;
