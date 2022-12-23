const User = require("../models/User");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

const register = async (req, res) => {
  const { username, password, email, age } = req.body;

  const emailAlreadyExists = await User.findOne({ email: email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("This Email already exists");
  }

  const firstAccountIsAdmin = (await User.countDocuments({})) === 0;
  const role = firstAccountIsAdmin ? "admin" : "user";
  const approval_status = firstAccountIsAdmin ? "approval" : "reject";
  const user = await User.create({
    username,
    password,
    email,
    age,
    role,
    approval_status,
  });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("PLEASE ENTER EMAIL AND PASSWORD");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.NotFoundError("USER DOES NOT EXIST");
  }
  const passwordIsCorrect = await user.comparePassword(password);

  if (!passwordIsCorrect) {
    throw new CustomError.BadRequestError("PASSWORD OR EMAIL INCORRECT!");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res
    .status(StatusCodes.OK)
    .json({ user: tokenUser.username, msg: "WELCOME BACK" });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()), //Removes the token from the user object.
  });
  res.status(StatusCodes.OK).json({ msg: "Success" });
};

module.exports = {
  register,
  login,
  logout,
};
