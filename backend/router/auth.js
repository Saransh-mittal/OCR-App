// Import the Express module to create a router
const express = require("express");

// Create an instance of an Express Router
const authRouter = express.Router();

// Import controllers for OCR and user-related routes
const ocrRoutes = require("../controllers/ocr");
const userRoutes = require("../controllers/user");

// Use the OCR and user controllers for routes under '/ocr' and '/user', respectively
authRouter.use("/ocr", ocrRoutes);
authRouter.use("/user", userRoutes);

// Export the configured router for use in other parts of the application
module.exports = authRouter;
