// Import necessary modules
const express = require("express"); // Express web framework
const router = express.Router(); // Create an Express router
const User = require("../model/userSchema"); // Mongoose model for user data

// Route for creating a new user or retrieving an existing user by email
router.post("/", async (req, res) => {
  // Extract email from the request body
  const { email } = req.body;

  try {
    // Check if a user with the given email already exists
    const user = await User.findOne({ email }).populate("ocrs");

    // If the user exists, return the user data (including associated OCRs)
    if (user) {
      return res.status(201).json(user);
    }

    // If the user does not exist, create a new user with the provided email
    const newUser = new User({
      email,
    });

    // Save the new user to the database
    await newUser.save();

    // Return the new user data in the response
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors during user creation or retrieval
    console.log(error.message);
    res.status(422).json({ error: error.message });
  }
});

// Export the router for use in other parts of the application
module.exports = router;
