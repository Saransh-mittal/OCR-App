// Import the React library
import React from "react";

// Functional component named Card
const Card = ({ data }) => {
  // JSX structure for displaying data in a preformatted block
  return (
    <pre>
      {/* Check if data exists and stringify selected keys */}
      {data &&
        JSON.stringify(
          // Use reduce to filter out specific keys from the data object
          Object.keys(data).reduce((object, key) => {
            // Exclude certain keys from the output
            if (
              key !== "_id" &&
              key !== "__v" &&
              key !== "active" &&
              key !== "createdAt" &&
              key !== "updatedAt"
            ) {
              // Add the key-value pair to the new object
              object[key] = data[key];
            }
            return object;
          }, {}),
          // Indentation and formatting for JSON.stringify
          null,
          2
        )}
    </pre>
  );
};

// Export the Card component for use in other parts of the application
export default Card;
