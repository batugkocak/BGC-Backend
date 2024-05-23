const jwt = require("jsonwebtoken");
const AuthUtil = require("../utils/authUtil");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const token = AuthUtil.extractTokenFromRequest(req);

  try {
    const payload = AuthUtil.validateJWT(token);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication is unvalid!");
  }
};

module.exports = auth;
