// Import necessary React hooks and components
import { createContext, useReducer } from "react";
import { Reducer } from "../reducer/useReducer"; // Assuming the existence of a Reducer component

// Define the initial state for the application
const initialState = {
  // Define your initial state properties here
  email: "", // Placeholder for user email
  recent: 0, // Counter for triggering recent updates
  edit: false, // Flag for controlling edit mode
  // ...         // Add more properties as needed for the initial state
};

// Create a React context to provide the application state globally
export const AppContext = createContext();

// Define the AppProvider component that utilizes the context and state management
export const AppProvider = ({ children }) => {
  // Use the useReducer hook to manage state updates based on actions dispatched
  const [state, dispatch] = useReducer(Reducer, initialState);

  // Return the AppContext.Provider with the current state and dispatch function
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}{" "}
      {/* Render the child components wrapped by the AppContext.Provider */}
    </AppContext.Provider>
  );
};
