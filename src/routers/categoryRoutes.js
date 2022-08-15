const express = require("express");
const categoryController = require("../controllers/categoryController");
const fs = require("fs");

const { Router } = express;
const router = new Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.addCategory);
router.post("/update", categoryController.updateCategories);
router.get("/delete", categoryController.deleteCategory);
router.post("/update/coverimage", categoryController.updateCategoryCoverImage);
module.exports = router;
