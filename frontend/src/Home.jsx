// Import necessary modules and components
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./contextAPI/appContext";
import axios from "axios";
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Input,
  Heading,
  AlertIcon,
  Alert,
  Text,
} from "@chakra-ui/react";
import History from "./History";
import Card from "./Card";

// Define the main Home component
const Home = () => {
  // Destructure state and dispatch from the AppContext
  const { state, dispatch } = useContext(AppContext);

  // State for managing the selected file, recent OCR data, and loading status
  const [file, setFile] = useState(null);
  const [recent, setRecent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Event handler for handling file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      // Display an alert if the selected file is too large
      return (
        <Alert status="error">
          <AlertIcon />
          Please choose an image file not larger than 2MB.
        </Alert>
      );
    }
  };

  // Event handler for handling file upload
  const handleUpload = async () => {
    setLoading(true);
    try {
      // Create a FormData object and append the selected file and user email
      const formData = new FormData();
      formData.append("image", file);
      formData.append("email", state.email);

      // Make a POST request to the "/api/ocr/detect" endpoint with the form data
      const response = await axios.post("/api/ocr/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response from the server
      if (response.status === 201) {
        setRecent(response.data);
        // Update the recent state and trigger a global state update
        await dispatch({ type: "RECENT_UPDATE", payloadRecent: !state.recent });
        console.log(response.data);
        console.log("Image uploaded successfully");
      } else {
        // Display an alert if the upload fails
        return (
          <Alert status="error">
            <AlertIcon />
            Failed to upload image
          </Alert>
        );
      }
    } catch (error) {
      // Handle errors during the upload process
      console.error("Error uploading image", error.response.data.error);
      return (
        <Alert status="error">
          <AlertIcon />
          Failed to upload image
        </Alert>
      );
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to check if a user is logged in, if not, navigate to the login page
  useEffect(() => {
    if (state.email === "") {
      navigate("/");
    }
  }, [state.email]);

  // Event handler for handling user logout
  const handleLogout = async () => {
    await dispatch({ type: "SET_EMAIL", payloadEmail: "" });
  };

  // Render the JSX structure for the Home component
  return (
    <>
      {/* Container for the entire Home component */}
      <Box w="100%">
        {/* Flex container for centering content vertically and horizontally */}
        <Flex
          justifyContent="center"
          h="100%"
          marginTop={7}
          flexDirection="column"
          alignItems="center"
        >
          {/* Flex container for the OCR file upload section */}
          <Flex
            marginBottom={20}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {/* Heading for the OCR file upload section */}
            <Heading marginBottom={4} as="h3" size="lg">
              Upload the file for OCR
            </Heading>
            <Text marginBottom={4} as="h3" size="lg">
              Image file not larger than 2MB
            </Text>

            {/* Input for selecting the OCR file */}
            <Input
              onChange={handleFileChange}
              name="image"
              type="file"
              placeholder="Upload the pic for OCR"
              size="md"
              bg="#0f0d15"
              border="1px solid gray"
              borderRadius="md"
              p={1}
              _hover={{ boxShadow: "md" }}
              _focus={{ outline: "none", boxShadow: "outline" }}
              _placeholder={{ color: "gray.400" }}
              _active={{ bg: "#0f0d15" }}
            />

            {/* Button for triggering the file upload */}
            <Button
              isLoading={loading}
              marginTop={3}
              onClick={() => handleUpload()}
            >
              Upload
            </Button>
          </Flex>

          {/* Container for the OCR history and recent tabs */}
          <Box w="50%">
            {/* Tabs for switching between OCR history and recent */}
            <Tabs variant="soft-rounded" colorScheme="green">
              {/* TabList for displaying tab titles */}
              <TabList>
                <Tab>Recent</Tab>
                <Tab>History</Tab>
              </TabList>

              {/* TabPanels for displaying the content of each tab */}
              <TabPanels>
                {/* TabPanel for displaying recent OCR data */}
                <TabPanel>
                  <Box
                    w="100%"
                    marginTop={3}
                    bgGradient="linear(to-r, teal.500, blue.500)"
                    p={3}
                  >
                    {/* Display recent OCR data or a message if there is no recent data */}
                    {recent ? <Card data={recent} /> : "No Uploads"}
                  </Box>
                </TabPanel>

                {/* TabPanel for displaying OCR history */}
                <TabPanel>
                  <Box
                    w="100%"
                    marginTop={3}
                    bgGradient="linear(to-r, teal.500, blue.500)"
                    p={3}
                  >
                    {/* Display OCR history component */}
                    <History />
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          {/* Button for user logout */}
          <Button onClick={handleLogout}>Logout</Button>
        </Flex>
      </Box>
    </>
  );
};

// Export the Home component for use in other parts of the application
export default Home;
