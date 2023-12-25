// Import the Mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Retrieve the MongoDB connection string from the environment variables
const DB = process.env.DATABASE;

// Connect to the MongoDB database using the connection string
mongoose
  .connect(DB)
  .then(() => {
    // If the connection is successful, log a success message to the console
    console.log(`Connection successful`);
  })
  .catch((err) => {
    // If there is an error during the connection, log an error message to the console
    console.log(`Connection unsuccessful`);
  });
