const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  votes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      votedAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  voteCount:{
    type:Number,
    default:0
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
});

const user = mongoose.model("Candidate", candidateSchema);
module.exports = user;
