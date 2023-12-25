// Import necessary modules and components
import React, { useContext, useState } from "react";
import "./App.css"; // Import styles for the App component
import axios from "axios"; // Import Axios for making HTTP requests
import { Input, Button, Box, Flex } from "@chakra-ui/react"; // Import Chakra UI components
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import { AppContext } from "./contextAPI/appContext"; // Import the AppContext for state management

// Define the main App component
const App = () => {
  // Destructure state and dispatch from the AppContext
  const { state, dispatch } = useContext(AppContext);

  // State for managing the user's email input
  const [email, setEmail] = useState("");

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Event handler for updating the email state
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  // Event handler for handling the "Proceed" button click
  const handleProceed = async () => {
    try {
      // Make a POST request to the "/api/user" endpoint with the entered email
      const response = await axios.post("/api/user", { email });

      // Check if the request is successful (status code 201)
      if (response.status === 201) {
        console.log("Login Successful");

        // Dispatch an action to update the email in the global state
        await dispatch({ type: "SET_EMAIL", payloadEmail: email });

        // Navigate to the "/home" route
        navigate("/home");
      }
    } catch (error) {
      // Handle errors during the POST request
      console.error(error.response.data.error);
    }
  };

  // Render the JSX structure for the App component
  return (
    <>
      {/* Flex container for centering content vertically and horizontally */}
      <Flex
        h="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        {/* Text indicating the purpose of the email input */}
        <Box textAlign="center" fontSize="xl" fontWeight="bold" marginTop={8}>
          Enter Your Email to get started with OCR App
        </Box>

        {/* Container for the email input and "Proceed" button */}
        <Box
          w="75%"
          bgGradient="linear(to-r, teal.500, blue.500)"
          padding={4}
          marginTop={4}
        >
          {/* Flex container for aligning input and button horizontally */}
          <Flex align="center" justify="center">
            {/* Email input */}
            <Input
              onChange={handleChangeEmail}
              placeholder="Enter Your Email"
              _placeholder={{ color: "white" }}
              name="email"
              value={email}
              size="lg"
              borderRadius="md"
              marginRight={4}
            />

            {/* "Proceed" button */}
            <Button onClick={handleProceed} size="lg">
              Proceed
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

// Export the App component for use in other parts of the application
export default App;
