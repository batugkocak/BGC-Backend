const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const package = require("../package.json");
const config = require("./configs");

const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// DEFINE ROUTES
const authRoute = require("./routes/auth");

// MIDDLEWARES
app.use(express.json());

// ROUTES
function consoleLogRequest(app) {
  app.all("*", (req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
  });
}
consoleLogRequest(app);

app.use("/api/v1/auth", authRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

async function initalizeServer() {
  console.clear();
  console.info("\x1b[32m%s\x1b[0m", "----------------INFO----------------");
  console.info(`ℹ️ NODE_ENV:`, "\x1b[33m", `            ${config.server.env}`);
  console.info(
    `ℹ️ URL:`,
    "\x1b[33m",
    `                 ${config.server.host_url}`
  );
  console.info(`ℹ️ Port:`, "\x1b[33m", `                ${config.server.port}`);
  console.info(`ℹ️ Database:`, "\x1b[33m", `            MongoDB`);

  console.info("\x1b[32m%s\x1b[0m", "---------------AUTHOR---------------");
  console.info(`ℹ️ Project Author:`, "\x1b[35m", `      ${package.author}`);
  console.info(`ℹ️ Project Version:`, "\x1b[35m", `     ${package.version}`);

  console.info("\x1b[32m%s\x1b[0m", "------------------------------------");
  console.log();

  await config.db();
  app.listen(config.server.port, () => {
    console.log(`Server listening on port ${config.server.port}`);
  });
}
initalizeServer();
