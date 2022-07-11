const express = require("express");
const bannerController = require("../controllers/bannerController");

const { Router } = express;
const router = new Router();

router
  .route("/")
  .get(bannerController.getBanners)
  .post(bannerController.addBanner);

router.get("/delete", bannerController.deleteBanner);

router.get("/update", bannerController.updateBannerStatus);

module.exports = router;
