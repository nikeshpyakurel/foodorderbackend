const express = require("express");
const adminController = require("../controllers/adminController");

const { Router } = express;
const router = new Router();

router.post("/login", adminController.login);
router.post("/register", adminController.register);


module.exports = router;
