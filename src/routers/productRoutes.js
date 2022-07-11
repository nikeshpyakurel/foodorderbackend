const express = require("express");
const productController = require("../controllers/productController");

const { Router } = express;
const router = new Router();

router.route("/").get(productController.get).post(productController.add);
router.get("/updateavailablestatus", productController.updateAvailableStatus);
router.post("/updateimage", productController.updateImage);
router.post("/update", productController.updateProductDetails);

module.exports = router;
