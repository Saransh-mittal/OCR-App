// Import necessary libraries and components from Chakra UI and React
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./contextAPI/appContext";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Tag,
} from "@chakra-ui/react";

// Functional component named ModalContainer
const ModalContainer = ({ data }) => {
  // Destructure state and dispatch from AppContext
  const { state, dispatch } = useContext(AppContext);

  // Function to handle modal closure
  const onClose = () => dispatch({ type: "SET_EDIT", payloadEdit: false });

  // State variables for managing edit data and loading state
  const [edit, setEdit] = useState(data);
  const [loading, setLoading] = useState(false);

  // useEffect hook to perform actions on component mount
  useEffect(() => {
    //console.log(data);
  }, []);

  // Function to handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEdit((prevEdit) => ({ ...prevEdit, [name]: value }));
  };

  // Function to handle saving changes in the modal
  const handleSave = async () => {
    setLoading(true);
    try {
      // Make a PUT request to update the data in the backend
      const response = await axios.put(`/api/ocr/update/${edit._id}`, edit);
      console.log(response.data);

      // Close the modal and trigger a recent update in the parent component
      dispatch({ type: "SET_EDIT", payloadEdit: false });
      dispatch({ type: "RECENT_UPDATE", payloadRecent: !state.recent });
    } catch (error) {
      console.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  // JSX structure for rendering the modal
  return (
    <>
      {/* Modal component for editing data */}
      <Modal isOpen={state.edit} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* Modal header */}
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />

          {/* Modal body with input fields for editing data */}
          <ModalBody>
            <Tag>identification_number</Tag>
            <Input
              type="text"
              name="identification_number"
              value={edit.identification_number}
              disabled
            />

            <Tag marginTop="20px">Name</Tag>
            <Input
              type="text"
              name="name"
              value={edit.name}
              onChange={handleInputChange}
            />

            <Tag marginTop="20px">Last Name</Tag>
            <Input
              type="text"
              name="last_name"
              value={edit.last_name}
              onChange={handleInputChange}
            />

            <Tag marginTop="20px">Date of Birth</Tag>
            <Input
              type="text"
              name="dateOfBirth"
              value={edit.dateOfBirth}
              onChange={handleInputChange}
            />

            <Tag marginTop="20px">Date of Issue</Tag>
            <Input
              type="text"
              name="dateOfIssue"
              value={edit.dateOfIssue}
              onChange={handleInputChange}
            />

            <Tag marginTop="20px">Date of Expiry</Tag>
            <Input
              type="text"
              name="dateOfExpiry"
              value={edit.dateOfExpiry}
              onChange={handleInputChange}
            />
          </ModalBody>

          {/* Modal footer with a button to submit changes */}
          <ModalFooter>
            <Button
              isLoading={loading}
              colorScheme="blue"
              mr={3}
              onClick={handleSave}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Export the ModalContainer component for use in other parts of the application
export default ModalContainer;
