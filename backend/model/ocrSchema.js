// Import the Mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Define the schema for OCR data
const ocrSchema = new mongoose.Schema(
  {
    // Identification number of the OCR data (e.g., document number)
    identification_number: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness in the collection
    },

    // Name of the individual associated with the OCR data
    name: {
      type: String,
      required: true,
    },

    // Last name of the individual associated with the OCR data
    last_name: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness in the collection
    },

    // Date of birth of the individual associated with the OCR data
    dateOfBirth: {
      type: String,
      required: true,
    },

    // Date when the OCR data was issued
    dateOfIssue: {
      type: String,
      required: true,
    },

    // Date when the OCR data expires
    dateOfExpiry: {
      type: String,
      required: true,
    },

    // Flag indicating whether the OCR data is currently active
    active: {
      type: Boolean,
      required: true,
    },
  },

  // Additional options for the schema
  {
    timestamps: true, // Include createdAt and updatedAt timestamps
    collection: "Ocrs", // Specify the MongoDB collection name
  }
);

// Create a Mongoose model named "OCR" using the defined schema
const Ocr = mongoose.model("OCR", ocrSchema);

// Export the Mongoose model for use in other parts of the application
module.exports = Ocr;
