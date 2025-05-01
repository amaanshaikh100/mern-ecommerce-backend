const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError("Email or password cannot be empty.", 400));

  const user = await User.findOne({ email }).select("+password");
  console.log(user);

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("User or password is wrong.", 401));

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
