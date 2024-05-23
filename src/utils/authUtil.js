const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs").auth;
const { UnauthenticatedError } = require("../errors");

const AuthUtil = {
  createHashedPassword: async function (password) {
    const salt = await bcrypt.genSalt(authConfig.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },

  createJWT: function (userId, name) {
    return jwt.sign({ userId: userId, name: name }, authConfig.tokenSecret, {
      expiresIn: authConfig.tokenLifetime,
    });
  },

  comparePassword: async function (canditatePassword, hash) {
    return await bcrypt.compare(canditatePassword, hash);
  },

  validateJWT: function (token) {
    try {
      return jwt.verify(token, authConfig.tokenSecret);
    } catch (err) {
      throw new UnauthenticatedError("Authentication invalid");
    }
  },

  extractTokenFromRequest(req) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.split(" ")[1];
    }
    throw new UnauthenticatedError("Authentication invalid");
  },

  async getUserIDFromToken(token) {
    try {
      const decodedToken = this.validateJWT(token);
      return decodedToken.userId;
    } catch (err) {
      throw new UnauthenticatedError("Authentication invalid");
    }
  },
};

// Could add refreshToken(token), revokeToken(token), ...
module.exports = AuthUtil;
