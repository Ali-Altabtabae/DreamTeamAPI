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
router.post("/users/messages/:userId", messageCreate);
// Delete Message
router.delete("/:userId/:messageId", messageDelete);
// Update Message
router.put("/messages/:messageId", messageUpdate);

module.exports = router;