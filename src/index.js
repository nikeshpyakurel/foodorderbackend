const express = require("express");
const cors = require("cors");

//importing routes
const categoryRoutes = require("./routers/categoryRoutes");
const adminRoutes = require("./routers/adminRoutes");
const productRoutes = require("./routers/productRoutes");
const dbConnection = require("./utils/dbConnection");

//creating express server object
const server = express();

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

//Routes
usingCustomRouter("/category", categoryRoutes);
usingCustomRouter("/auth/admin", adminRoutes);
usingCustomRouter("/product", productRoutes);

//Listening Server to Port
server.listen(420, () => {
  console.log("server started on port 420");
  //MongoDB Connection
  dbConnection.connect();
});

function usingCustomRouter(endpoint, routes) {
  server.use(endpoint, routes);
}
