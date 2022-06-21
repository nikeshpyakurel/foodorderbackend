const express = require("express");
const server = express();

const usingCustomRouter = (endpoint, routes) => {
  return server.use(endpoint, routes);
};

module.exports = { usingCustomRouter };
