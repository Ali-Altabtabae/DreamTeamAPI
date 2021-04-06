const express = require("express");
const router = express.Router();
const { userList, signup, signin } = require("../controllers/userController");
const passport = require("passport");

// Get Users
router.get("/users", userList);
// Create Users
router.post("/signup", signup);
// Passport Authentication
router.post(
    "/signin",
    passport.authenticate("local", { session: false }),
    signin
  );

module.exports = router;
