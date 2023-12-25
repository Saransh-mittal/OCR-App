// Import React and necessary components from 'react-router-dom'
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// Import components for the application
import App from "./App";
import Home from "./Home";

// Define the main component for handling application routes
const RoutesOfApp = () => {
  return (
    <>
      {/* Use the 'Routes' component to define application routes */}
      <Routes>
        {/* Route for the root path ("/") */}
        <Route path="/" element={<App />} />

        {/* Route for the exact path "/home" */}
        <Route exact path="/home" element={<Home />} />

        {/* Route for handling any other paths not matched above */}
        {/* Navigate to the root path ("/") and replace the current entry in the history stack */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

// Export the main component for application routes
export default RoutesOfApp;
