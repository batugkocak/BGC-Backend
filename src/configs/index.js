const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  db: require("./database"),
  server: require("./server"),
  auth: require("./auth"),
};
