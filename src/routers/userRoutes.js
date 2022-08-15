const express = require("express");
const userController = require("../controllers/userController");
const { Router } = express;
const router = new Router();


router.get("/", userController.getUsers);
router.get("/profile", userController.getUsersById);
router.get("/updatetoken", userController.updateDeviceToken);
router.post("/login", userController.userLogin);
router.post("/register", userController.userRegister);
router.post("/updateprofileimage", userController.updateUserProfileImage);

module.exports = router;
