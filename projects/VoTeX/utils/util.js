const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    if (user && user.role === "admin") {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
};

module.exports = { checkAdminRole };