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

// Routes
const userRoute = require("./routes/userRoute");
app.use(userRoute);

// Run the API
const run = async () => {
  try {
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
