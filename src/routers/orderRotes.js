const express = require("express");
const orderController = require("../controllers/orderController");

const { Router } = express;
const router = new Router();

router.get("/all", orderController.getOrders);
router.get("/", orderController.getOrderById);
router.get("/user", orderController.getUserOrders);
router.post("/placeorder", orderController.createOrder);
router.get("/orderstatus", orderController.chagneOrderStatus);

module.exports = router;
