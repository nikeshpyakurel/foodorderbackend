const express = require("express");
const productController = require("../controllers/productController");

const { Router } = express;
const router = new Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.addProduct);

module.exports = router;
