const express = require("express");
const router = express.Router();
const {
  roomList,
  roomDelete,
  roomUpdate,
  roomCreate,
} = require("../controllers/roomController");
const passport = require("passport");

// Get Rooms
router.get("/rooms", roomList);
// Create Room
router.post("/users/rooms/:userId", roomCreate);
// Delete Room
router.delete("/:userId/:roomId", roomDelete);
// Update Room
router.put("/rooms/:roomId", roomUpdate);

module.exports = router;
