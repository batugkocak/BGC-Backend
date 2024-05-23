const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const AuthUtil = require("../utils/authUtil");
const {
  UNAUTHORIZED,
  INVALID_CREDENTIALS,
  MISSING_CREDENTIALS,
} = require("../constants/error_messages");

const register = async (req, res, next) => {
  const { roles, createdBy } = req.body;
  if (roles || createdBy) {
    throw new UnauthenticatedError(UNAUTHORIZED);
  }

  const user = await User.create({ ...req.body });
  const token = AuthUtil.createJWT(user._id, user.name);
  res
    .status(StatusCodes.CREATED)
    .json({ user: { id: user._id, name: user.name }, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError(MISSING_CREDENTIALS);
  }
  const user = await User.findOne({ email });

  if (!user || !(await AuthUtil.comparePassword(password, user.password))) {
    throw new UnauthenticatedError(INVALID_CREDENTIALS);
  }
  const token = AuthUtil.createJWT(user._id, user.name);
  res
    .status(StatusCodes.OK)
    .json({ user: { id: user._id, name: user.name }, token });
};

module.exports = {
  login,
  register,
};
