const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../middlewares/auth");
const { signup, login, profile, changePassword } = require("../controllers/userController");

// POST route to add a person
router.post("/signup", signup);

// Login Route
router.post("/login", login);

// Profile route
router.get("/profile", jwtAuthMiddleware, profile);

// change password route
router.put("/profile/password", jwtAuthMiddleware, changePassword);

module.exports = router;
