const { Message, User, Room } = require("../db/models");

// Fetch Message
exports.fetchMessage = async (messageId, next) => {
  try {
    const message = await Message.findByPk(messageId);
    return message;
  } catch (error) {
    next(error);
  }
};

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
  const { userId } = req.params;
  const { roomId } = req.params;
  req.body.userId = userId;
  req.body.roomId = roomId;
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
  try {
    console.log("This is req.user.id: ",req.user.id)
    const foundMessage = await Message.findByPk(messageId);
    if (foundMessage) {
      await foundMessage.destroy();
      res.status(204).end();
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
  const foundMessage = await this.fetchMessage(messageId, next);
  if (foundMessage) {
    await foundMessage.update(req.body);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Message not found" });
  }
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (err) {
    next(error);
  }
};
