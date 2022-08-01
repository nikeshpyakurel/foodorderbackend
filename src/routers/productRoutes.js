const express = require("express");
const productController = require("../controllers/productController");

const { Router } = express;
const router = new Router();

router.route("/").get(productController.get).post(productController.add);
router.get("/updateavailablestatus", productController.updateAvailableStatus);
router.post("/updateimage", productController.updateImage);
router.post("/update", productController.updateProductDetails);
router.get("/delete", productController.delete);
// router.get("/filtercategory", productController.getProductByCategory);

module.exports = router;
