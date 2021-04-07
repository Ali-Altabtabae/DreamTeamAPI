const express = require("express");
const router = express.Router();
const {
  messageList,
  messageDelete,
  messageUpdate,
  messageCreate,
} = require("../controllers/messageController");
const passport = require("passport");

// Get Messages
router.get("/messages", messageList);
// Create Message
router.post(
  "/:roomId/createMessage",
  passport.authenticate("jwt", { session: false }),
  messageCreate
);
// Delete Message
router.delete(
  "/:roomId/deleteMessage/:messageId",
  passport.authenticate("jwt", { session: false }),
  messageDelete
);
// Update Message
router.put(
  "/:roomId/updateMessage/:messageId",
  passport.authenticate("jwt", { session: false }),
  messageUpdate
);

module.exports = router;
