const express = require("express");
const server = express();
class CustomRouter {
  route(endpoint, routes) {
    server.use(endpoint, routes);
  }
}

module.exports = CustomRouter;
