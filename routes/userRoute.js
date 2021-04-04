const express = require("express");
const router = express.Router();
const { signup, userList } = require("../controllers/userController");

// Get Users
router.get("/users", userList);
// Create Users
router.post("/signup", signup);


module.exports = router;
