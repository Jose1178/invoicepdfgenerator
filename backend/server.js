const express = require("express");

// Create express app
const app = express();


// Database Configuration
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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


// Server Configuration
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Server is listening on port ", PORT);
});
