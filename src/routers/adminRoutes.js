const express = require("express");
const { Router } = express;
const bcrypt = require("bcryptjs");
const router = new Router();
const AdminUser = require("../models/admin");
const adminController = require("../controllers/adminController");

router.post("/login", adminController.adminLogin);

router.post("/register", adminController.adminRegister);

module.exports = router;
