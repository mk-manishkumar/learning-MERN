const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/socialMedia`);

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  age: Number,
  profilePic: {
    type: String,
    default: "default.png",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
