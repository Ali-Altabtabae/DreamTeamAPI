const { Room, User, Message } = require("../db/models");

// Fetch Room
exports.fetchRoom = async (roomId, next) => {
  try {
    const room = await Room.findByPk(roomId);
    return room;
  } catch (error) {
    next(error);
  }
};

// List Rooms
exports.roomList = async (req, res, next) => {
  try {
    const rooms = await Room.findAll({
      attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
        {
          model: Message,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};
// Create Room
exports.roomCreate = async (req, res, next) => {
  const { roomId } = req.params;
  req.body.roomId = roomId;
  req.body.userId = req.user.id;
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};
// Delete Room
exports.roomDelete = async (req, res) => {
  const { roomId } = req.params;
  req.body.roomId = roomId;

  req.body.userId = req.user.id;

  try {
    const foundRoom = await Room.findByPk(roomId);
    if (foundRoom && req.user.id === foundRoom.userId) {
      await foundRoom.destroy();
      res.status(204).end();
    } else if (foundRoom) {
      res.status(404).json({ message: "Cannot delete this room" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
// Update Room
exports.roomUpdate = async (req, res, next) => {
  const { roomId } = req.params;
  req.body.roomId = roomId;

  req.body.userId = req.user.id;
  
  try {
    const foundRoom = await Room.findByPk(roomId);
    if (foundRoom && req.user.id === foundRoom.userId) {
      await foundRoom.update(req.body);
      res.status(204).end();
    } else if (foundRoom) {
      res.status(404).json({ message: "Cannot update this room" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    next(error);
  }
};
