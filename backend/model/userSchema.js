// Import the Mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Define the schema for user data
const userSchema = new mongoose.Schema(
  {
    // Email address of the user (unique)
    email: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness in the collection
    },

    // Array of OCRs associated with the user, stored as ObjectIds referencing the "OCR" model
    ocrs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OCR", // Reference to the "OCR" model
      },
    ],
  },

  // Additional options for the schema
  {
    collection: "Users", // Specify the MongoDB collection name
  }
);

// Create a Mongoose model named "USER" using the defined schema
const User = mongoose.model("USER", userSchema);

// Export the Mongoose model for use in other parts of the application
module.exports = User;
