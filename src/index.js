const express = require("express");
const cors = require("cors");
const { Router } = express;
const router = new Router();

//importing routes
const categoryRoutes = require("./routers/categoryRoutes");
const adminRoutes = require("./routers/adminRoutes");
const productRoutes = require("./routers/productRoutes");
const userRoutes = require("./routers/userRoutes");
const bannerRoutes = require("./routers/bannerRoutes");
const dbConnection = require("./utils/dbConnection");

//creating express server object
const server = express();

server.use(express.json({ limit: "200mb" }));
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use("/uploads", express.static("uploads"));
//Routes
usingCustomRouter("/category", categoryRoutes);
usingCustomRouter("/banners", bannerRoutes);
usingCustomRouter("/auth/admin", adminRoutes);
usingCustomRouter("/user", userRoutes);
usingCustomRouter("/product", productRoutes);
usingCustomRouter("/",(_,res)=>{res.send("hello")})

//Listening Server to Port
server.listen(420, () => {
  console.log("server started on port 420");
  //MongoDB Connection
  dbConnection.connect();
});

function usingCustomRouter(endpoint, routes) {
  server.use(endpoint, routes);
}
