"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// User to Room (One To Many)

db.User.hasMany(db.Room, {
  foreignKey: {
    name: "userId",
    allowNull: false
  }
});

db.Room.belongsTo(db.User, {
   foreignKey: "userId",
});

// User to Message (One To Many)

db.User.hasMany(db.Message, {
  foreignKey: {
    name: "userId",
    allowNull: false
  }
});

db.Message.belongsTo(db.User, {
   foreignKey: "userId",
});

// Room to Message (One To Many)

db.Room.hasMany(db.Message, {
  foreignKey: {
    name: "roomId",
    allowNull: false
  }
});

db.Message.belongsTo(db.Room, {
   foreignKey: "roomId",
});

module.exports = db;
