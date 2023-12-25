// Define the Reducer function responsible for updating the application state
export const Reducer = (state, action) => {
  // Use a switch statement to handle different action types and their corresponding state updates

  switch (action.type) {
    // Action type: "SET_EMAIL"
    case "SET_EMAIL":
      // Return a new state object with the email property updated based on the action payload
      return { ...state, email: action.payloadEmail };

    // Action type: "RECENT_UPDATE"
    case "RECENT_UPDATE":
      // Return a new state object with the recent property updated based on the action payload
      return { ...state, recent: action.payloadRecent };

    // Add more cases for other action types as needed
    // Action type: "SET_EDIT"
    case "SET_EDIT":
      // Return a new state object with the edit property updated based on the action payload
      return { ...state, edit: action.payloadEdit };

    // Default case: Return the current state if the action type is not recognized
    default:
      return state;
  }
};
