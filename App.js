// Express
const express = require("express");
const app = express();

// Cors
const cors = require("cors");
app.use(cors());

// body-parser
app.use(express.json());

// Database
const db = require("./db/models");

// Passport
const passport = require("passport");
app.use(passport.initialize());

// Passport Strategy
const { localStrategy, jwtStrategy } = require("./middleware/passport");
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

// Routes
const userRoute = require("./routes/userRoute");
app.use(userRoute);
const roomRoute = require("./routes/roomRoute");
app.use(roomRoute);
const messageRoute = require("./routes/messageRoute");
app.use(messageRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});
// Paths Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});
// Run the API
const run = async () => {
  try {
    //await db.sequelize.sync({force: true});
    await db.sequelize.sync();
    console.log("Connecting to the database seccessful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
};
run();
