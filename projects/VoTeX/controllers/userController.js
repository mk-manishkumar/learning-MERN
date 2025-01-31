const User = require("../models/user.model");
const { generateToken } = require("../middlewares/auth");

// ====================SIGNUP CONTROLLER=====================
const signup = async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the User data

    // Check if there is already an admin user
    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    // Validate Aadhar Card Number must have exactly 12 digit
    if (!/^\d{12}$/.test(data.aadharCardNumber)) {
      return res.status(400).json({ error: "Aadhar Card Number must be exactly 12 digits" });
    }

    // Check if a user with the same Aadhar Card Number already exists
    const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
    if (existingUser) {
      return res.status(400).json({ error: "User with the same Aadhar Card Number already exists" });
    }

    // Create a new User document using the Mongoose model
    const newUser = new User(data);

    // Save the new user to the database
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ====================LOGIN CONTROLLER=====================
const login = async (req, res) => {
  try {
    // Extract aadharCardNumber and password from request body
    const { aadharCardNumber, password } = req.body;

    // Check if aadharCardNumber or password is missing
    if (!aadharCardNumber || !password) {
      return res.status(400).json({ error: "Aadhar Card Number and password are required" });
    }

    // Find the user by aadharCardNumber
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Aadhar Card Number or Password" });
    }

    // generate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    // resturn token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ====================PROFILE CONTROLLER=====================
const profile = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ====================CHANGE PASSWORD CONTROLLER=====================
const changePassword = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const { currentPassword, newPassword } = req.body;

    // Check if currentPassword and newPassword are present in the request body
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both currentPassword and newPassword are required" });
    }

    // Find the user by userID
    const user = await User.findById(userId);

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { signup, login, profile, changePassword };
