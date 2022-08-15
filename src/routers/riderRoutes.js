const express = require("express");
const riderController = require("../controllers/riderController");

const { Router } = express;
const router = new Router();

router.post("/login", riderController.login);
router.get("/delete", riderController.delete);
router.get("/all", riderController.all);
router.post("/register", riderController.register);

module.exports = router;
