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
router.get("/", roomList);
// Create Room
router.post(
  "/createRoom",
  passport.authenticate("jwt", { session: false }),
  roomCreate
);
// Delete Room
router.delete(
  "/:roomId/roomDelete",
  passport.authenticate("jwt", { session: false }),
  roomDelete
);
// Update Room
router.put(
  "/:roomId/updateRoom",
  passport.authenticate("jwt", { session: false }),
  roomUpdate
);

module.exports = router;
