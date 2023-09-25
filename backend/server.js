const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// Middleware to parse JSON in request body
app.use(express.json());

// Database Configuration
const dbConfig = require("./config/database.config.js");


// Setting Mongoose to use the global Promise constructor
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// System Route
app.get("/", (req, res) => {
  res.json({
    message: "Server running successfully!!",
    creator: "Jowamu",
    year: "2023",
    for: "Invoicepdf test",
  });
});

// Routes
const userRoutes = require("./app/routes/routes.js");
app.use(userRoutes); 

const PORT = process.env.PORT || 8081;

// Server Configuration
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

