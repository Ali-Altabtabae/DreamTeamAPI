const { Message, User, Room } = require("../db/models");

// List Messages
exports.messageList = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      attributes: { exclude: ["userId", "roomId", "createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
        {
          model: Room,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
// Create Message
exports.messageCreate = async (req, res, next) => {
  const { roomId } = req.params;
  req.body.roomId = roomId;
  req.body.userId = req.user.id;
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
// Delete Room
exports.messageDelete = async (req, res) => {
  const { messageId } = req.params;
  const { roomId } = req.params;
  req.body.messageId = messageId;
  req.body.roomId = roomId;

  req.body.userId = req.user.id;

  try {
    const foundMessage = await Message.findByPk(messageId);
    if (foundMessage && req.user.id === foundMessage.userId) {
      await foundMessage.destroy();
      res.status(204).end();
    } else if (foundMessage) {
      res.status(404).json({ message: "Cannot delete this message" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
// Update Room
exports.messageUpdate = async (req, res, next) => {
  const { messageId } = req.params;
  const { roomId } = req.params;
  req.body.messageId = messageId;
  req.body.roomId = roomId;

  req.body.userId = req.user.id;

  try {
    const foundMessage = await Message.findByPk(messageId);
    if (foundMessage && req.user.id === foundMessage.userId) {
      await foundMessage.update(req.body);
      res.status(204).end();
    } else if (foundMessage) {
      res.status(404).json({ message: "Cannot update this message" });
    } else {
      res.status(404).json({ message: "Message not found" });
    }
  } catch (err) {
    next(error);
  }
};
