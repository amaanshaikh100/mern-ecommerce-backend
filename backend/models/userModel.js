const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name."],
    },
    email: {
      type: String,
      required: [true, "A user must have an email."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: { type: String, default: "default.jpg" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    age: {
      type: Number,
      required: [true, "A user must have an age."],
      min: 10,
    },
    password: {
      type: String,
      required: [true, "A user must have a password."],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password not confirmed."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same.",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.correctPassword = async function (
  userPassword,
  candidatePassword
) {
  return await bcrypt.compare(userPassword, candidatePassword);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
