const mongoose = require("mongoose");

const url = process.env.MONGO_URI;

mongoose
  .connect(url)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error("Database connection error:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
    lowercase: true,
    unique: true,
  },

  firstname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },

  lastname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
  },

  password: {
    type: String,
    require: true,
    minLength: 4,
  },
});

const user = mongoose.model("User", userSchema);

module.exports = {
  user,
};
