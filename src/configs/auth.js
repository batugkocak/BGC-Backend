module.exports = {
  tokenLifetime: process.env.JWT_LIFETIME || 900,
  tokenSecret: process.env.JWT_SECRET,
  saltRounds: 10,
};
