const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    roomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Room;
};
