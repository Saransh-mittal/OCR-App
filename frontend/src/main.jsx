// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Import AppProvider from custom contextAPI
import { AppProvider } from "./contextAPI/appContext";

// Import BrowserRouter for client-side routing and ChakraProvider for Chakra UI styling
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Import the main component containing application routes
import RoutesOfApp from "./RoutesOfApp.jsx";

// Use ReactDOM.createRoot to enable Concurrent Mode and render the application
// StrictMode is used to highlight potential problems in the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter provides client-side routing capabilities */}
    <BrowserRouter>
      {/* ChakraProvider provides the Chakra UI styling to the entire application */}
      <ChakraProvider>
        {/* AppProvider wraps the entire application with a custom context provider */}
        <AppProvider>
          {/* RoutesOfApp contains the main structure and routing logic of the application */}
          <RoutesOfApp />
        </AppProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
