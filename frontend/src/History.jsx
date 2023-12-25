// Import necessary libraries and components from Chakra UI and React
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./contextAPI/appContext";
import axios from "axios";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Button,
  Input,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import ModalContainer from "./ModalContainer";

// Functional component named history
const history = () => {
  // Destructure state and dispatch from AppContext
  const { state, dispatch } = useContext(AppContext);

  // State variables for managing data, search term, search results, and editing
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [edit, setEdit] = useState({});

  // Custom hook to determine if the screen is smaller
  const [isSmallerScreen] = useMediaQuery("(max-width: 1100px)");

  // Function to handle search based on the search term
  const handleSearch = () => {
    const results = data.filter((item) => {
      return Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSearchResults(results);
  };

  // Function to fetch user history data
  const fetchUserHistory = async () => {
    try {
      const response = await axios.post("/api/user", { email: state.email });
      const unsortedData = response.data.ocrs.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);
        return dateB - dateA; // Descending order, use dateA - dateB for ascending order
      });
      setData(unsortedData);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  // useEffect hook to fetch user history when state.recent changes
  useEffect(() => {
    fetchUserHistory();
  }, [state.recent]);

  // Function to handle the edit of an item
  const handleEdit = (item) => {
    setEdit(item);
    dispatch({ type: "SET_EDIT", payloadEdit: true });
  };

  // Function to handle the soft deletion (deactivation) of an item
  const handleDelete = async (item) => {
    try {
      const response = await axios.put(`/api/ocr/soft-delete/${item._id}`);
      dispatch({ type: "RECENT_UPDATE", payloadRecent: !state.recent });
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  // JSX structure for rendering the component
  return (
    <>
      {/* Render ModalContainer component if state.edit is true */}
      {state.edit && <ModalContainer data={edit} />}

      {/* Accordion component for displaying user history data */}
      <Accordion defaultIndex={[0]} allowMultiple>
        <Flex>
          {/* Input for searching ID cards */}
          <Input
            placeholder="Search for ID cards"
            onChange={(e) => setSearchTerm(e.target.value)}
            _placeholder={{ color: "white" }}
          />

          {/* Button for triggering the search */}
          <Button
            marginBottom="10px"
            colorScheme="green"
            width="140px"
            marginLeft="5px"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>

        {/* Conditionally render search results or all data based on conditions */}
        {searchResults.length > 0 && searchTerm
          ? searchResults
              .filter((item) => item["active"])
              .map((item, idx) => {
                return (
                  <AccordionItem key={item._id}>
                    {/* AccordionButton for each item */}
                    <h2>
                      <AccordionButton>
                        {/* Box for displaying ID number */}
                        <Box as="span" flex="1" textAlign="left">
                          <Heading size="sm">Id number: </Heading>
                          {item["identification_number"]}
                        </Box>

                        {/* Flex container for Edit and Delete buttons */}
                        <Flex
                          flexDirection={isSmallerScreen ? "column" : ""}
                          gap={2}
                        >
                          <Button
                            colorScheme="teal"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                            width="140px"
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            marginRight="0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            width="140px"
                          >
                            Delete(deactivate)
                          </Button>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>

                    {/* AccordionPanel for displaying additional information */}
                    <AccordionPanel pb={4}>
                      <pre>
                        {item &&
                          JSON.stringify(
                            Object.keys(item).reduce((object, key) => {
                              if (
                                key !== "_id" &&
                                key !== "__v" &&
                                key !== "active" &&
                                key !== "createdAt" &&
                                key !== "updatedAt"
                              ) {
                                object[key] = item[key];
                              }
                              return object;
                            }, {}),
                            null,
                            2
                          )}
                      </pre>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })
          : data.length > 0
          ? data
              .filter((item) => item["active"])
              .map((item, idx) => {
                return (
                  <AccordionItem key={item._id}>
                    {/* AccordionButton for each item */}
                    <h2>
                      <AccordionButton>
                        {/* Box for displaying ID number */}
                        <Box as="span" flex="1" textAlign="left">
                          <Heading size="sm">Id number: </Heading>
                          {item["identification_number"]}
                        </Box>

                        {/* Flex container for Edit and Delete buttons */}
                        <Flex
                          flexDirection={isSmallerScreen ? "column" : ""}
                          gap={2}
                        >
                          <Button
                            colorScheme="teal"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(item);
                            }}
                            width="140px"
                          >
                            Edit
                          </Button>
                          <Button
                            colorScheme="red"
                            marginRight="0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(item);
                            }}
                            width="140px"
                          >
                            Delete(deactivate)
                          </Button>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>

                    {/* AccordionPanel for displaying additional information */}
                    <AccordionPanel pb={4}>
                      <pre>
                        {item &&
                          JSON.stringify(
                            Object.keys(item).reduce((object, key) => {
                              if (
                                key !== "_id" &&
                                key !== "__v" &&
                                key !== "active" &&
                                key !== "createdAt" &&
                                key !== "updatedAt"
                              ) {
                                object[key] = item[key];
                              }
                              return object;
                            }, {}),
                            null,
                            2
                          )}
                      </pre>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })
          : "No Data Found"}
      </Accordion>
    </>
  );
};

// Export the history component for use in other parts of the application
export default history;
