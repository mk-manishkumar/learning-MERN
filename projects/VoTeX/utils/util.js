const User = require("../models/user.model");

const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID).select("role"); // Fetch only the role
    return user?.role === "admin"; // Simplified return logic
  } catch (err) {
    console.error("Error in checkAdminRole:", err);
    return false;
  }
};

module.exports = { checkAdminRole };
