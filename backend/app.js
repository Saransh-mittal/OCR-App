// Import necessary modules
const dotenv = require("dotenv"); // Module for loading environment variables from a file
const express = require("express"); // Web framework for building the API

// Load environment variables from the specified file
dotenv.config({ path: "./config.env" });

// Create an instance of the Express application
const app = express();

// Connect to the database by requiring the connection file
require("./db/conn");

// Middleware to parse incoming JSON data
app.use(express.json());

// Define the port number to listen on, fetched from the environment variables
const PORT = process.env.PORT;

// Route handling: Mount the authentication router at the '/api' endpoint
app.use("/api", require("./router/auth"));

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Listening to port no. ${PORT}`);
});
