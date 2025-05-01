const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name."],
    },
    email: {
      type: String,
      required: [true, "A user must have an email."],
    },
    age: {
      type: Number,
      required: [true, "A user must have an age."],
      min: 10,
    },
    password: {
      type: String,
      required: [true, "A user must have a password."],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password not confirmed."],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
