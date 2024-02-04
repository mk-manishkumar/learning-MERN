const mongoose = require("mongoose");
const passport_local_mongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/fullstack-pinterest");

const userSchema = mongoose.Schema({
  username: String,
  fullname: String,
  email: String,
  password: String,
  profileImage: String,
  boards: {
    type: Array,
    default: [],
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

userSchema.plugin(passport_local_mongoose);

module.exports = mongoose.model("user", userSchema);
