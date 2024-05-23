module.exports = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  apiVersion: "v1",
  host_url: process.env.HOSTNAME,
};
