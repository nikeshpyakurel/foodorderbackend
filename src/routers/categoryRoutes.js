const express = require("express");
const categoryController = require("../controllers/categoryController");

const { Router } = express;
const router = new Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.addCategory);

module.exports = router;
