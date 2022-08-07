const express = require("express");
const categoryController = require("../controllers/categoryController");
const fs = require("fs");

const { Router } = express;
const router = new Router();

router.post("/ok", (req, res) => {
  try {
    fs.writeFile(
      `uploads/asd.txt`,
      req.body.data,
      { encoding: "base64" },
      function (err) {
        console.log(err, "Fs Error");
      }
    );
    res.send({"success":true});
  } catch (error) {
    res.send( {"error":error})
  }
});
router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.addCategory);
router.post("/update", categoryController.updateCategories);
router.get("/delete", categoryController.deleteCategory);
router.post("/update/coverimage", categoryController.updateCategoryCoverImage);
module.exports = router;
