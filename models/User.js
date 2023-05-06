const mongoose = require("mongoose");
//
const Schema = mongoose.Schema;
//
const userSchema = new Schema(
  {
    course: String,
    desc: String,
    student: Number,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
