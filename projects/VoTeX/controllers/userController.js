const User = require("../models/user.model");
const { generateToken } = require("../middlewares/auth");

// ====================SIGNUP CONTROLLER=====================
const signup = async (req, res) => {
  try {
    const data = req.body;

    // Ensure role is not manipulated (e.g., normal users can't sign up as admin)
    if (data.role && data.role !== "user" && data.role !== "admin") {
      return res.status(400).json({ error: "Invalid role" });
    }

    // Check if there is already an admin user
    if (data.role === "admin") {
      const adminUser = await User.findOne({ role: "admin" });
      if (adminUser) {
        return res.status(400).json({ error: "Admin user already exists" });
      }
    }

    // Ensure Aadhar Card Number is a valid 12-digit number
    if (!/^\d{12}$/.test(data.aadharCardNumber.trim())) {
      return res.status(400).json({ error: "Aadhar Card Number must be exactly 12 digits" });
    }

    // Prevent duplicate Aadhar Card Numbers
    const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
    if (existingUser) {
      return res.status(400).json({ error: "User with this Aadhar Card Number already exists" });
    }

    // Create new user
    const newUser = new User(data);
    const response = await newUser.save();

    // Generate token
    const token = generateToken({ id: response.id });

    res.status(201).json({ user: response, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user", details: err.message });
  }
};

// ====================LOGIN CONTROLLER=====================
const login = async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    // Check for missing fields
    if (!aadharCardNumber || !password) {
      return res.status(400).json({ error: "Aadhar Card Number and password are required" });
    }

    // Find user by Aadhar Card Number
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber.trim() });
    if (!user) {
      return res.status(401).json({ error: "Invalid Aadhar Card Number or Password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Aadhar Card Number or Password" });
    }

    // Generate token
    const token = generateToken({ id: user.id });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log in", details: err.message });
  }
};

// ====================PROFILE CONTROLLER=====================
const profile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password"); // Don't send password in response
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile", details: err.message });
  }
};

// ====================CHANGE PASSWORD CONTROLLER=====================
const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both current and new passwords are required" });
    }

    if (currentPassword.trim() === newPassword.trim()) {
      return res.status(400).json({ error: "New password must be different from the current password" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update password", details: err.message });
  }
};

module.exports = { signup, login, profile, changePassword };
