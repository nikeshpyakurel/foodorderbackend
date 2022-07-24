const express = require("express");
const userController = require("../controllers/userController");
const { Router } = express;
const router = new Router();


router.get("/", userController.getUsers);

router.get("/profile", userController.getUsersById);

router.post("/login", userController.userLogin);

router.post("/register", userController.userRegister);

router.post("/updateprofileimage", userController.updateUserProfileImage);

router.post("/updateprofile", userController.updateUserDetails);

module.exports = router;
