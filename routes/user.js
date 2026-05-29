const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth");

// Register
router.post("/register", userController.registerUser);

// Login
router.post("/login", userController.loginUser);

// Get User Details
router.get("/details", auth, userController.getUserDetails);

module.exports = router;
