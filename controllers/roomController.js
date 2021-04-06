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
  const { userId } = req.params;
  console.log("userId is ", userId);
  req.body.userId = userId;
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
  const { userId } = req.params
  try {
    const foundRoom = await Room.findByPk(roomId);
    if (foundRoom) {
      const getAdminId = foundRoom.userId;
      if (getAdminId === +userId) {
        await foundRoom.destroy();
        res.status(204).end();
      } else {
        res.status(404).json({ message: "You are not the Admin" });
      }
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
  const foundRoom = await this.fetchRoom(roomId, next);
  if (foundRoom) {
    await foundRoom.update(req.body);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Room not found" });
  }
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (err) {
    next(error);
  }
};
