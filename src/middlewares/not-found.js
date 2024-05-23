const { BadRequestError } = require("../errors");
const notFound = (req, res) => {
  throw new BadRequestError("Route does not exist!");
};

module.exports = notFound;
