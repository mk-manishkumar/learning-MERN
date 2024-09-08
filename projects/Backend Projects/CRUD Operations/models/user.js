const slugify = require("slugify");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/crudApp");

const userSchema = mongoose.Schema({
  image: String,
  email: String,
  name: String,
  description: String,
  slug: String,
});

userSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

module.exports = mongoose.model("User", userSchema);
