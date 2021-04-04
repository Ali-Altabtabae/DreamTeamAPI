const bcrypt = require("bcrypt");
const { User } = require("../db/models");

// List Users
exports.userList = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Create User
exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 5;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("exports.signup -> hashedPassword", hashedPassword);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
