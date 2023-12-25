# OCR Application Documentation

## Overview

This OCR (Optical Character Recognition) application empowers users to manage OCR data associated with individuals. It adopts a client-server architecture, comprising a backend built with Node.js, Express, and MongoDB, and a frontend crafted with React and Vite.

## Backend

### Dependencies

- @google-cloud/vision: Access to Google Cloud Vision API for advanced image analysis and OCR capabilities.
- dotenv: Securely loads environment variables from a .env file for storing sensitive configuration details.
- express: Robust Node.js web application framework for building the backend server and handling API requests.
- mongoose: Object Data Modeling (ODM) library for seamless interaction with MongoDB, simplifying database operations.
- multer: Middleware for handling multipart/form-data, enabling file uploads in the application.
- nodemon: Development tool that automatically restarts the server upon code changes, streamlining development workflows.


## Frontend

### Dependencies

Dependencies:

- @chakra-ui/react: For creating accessible and modular UI components.
- @emotion/react: For style definitions with a focus on performance and developer experience.
- @emotion/styled: For creating styled React components with a powerful syntax.
- axios: For making API requests in a simplified and efficient manner.
- framer-motion: For adding smooth and engaging animations to the application.
- react: The core React library for building user interfaces.
- react-dom: For rendering React components into the DOM.
- react-router-dom: For handling client-side routing in React applications.

DevDependencies:

- @types/react: Type definitions for React, enabling TypeScript support.
- @types/react-dom: Type definitions for React DOM, also for TypeScript support.
- @vitejs/plugin-react-swc: Vite plugin for using SWC as a React transformer, enhancing performance.
- eslint: Lints code to maintain code quality and catch potential errors.
- eslint-plugin-react: ESLint plugin for React-specific linting rules.
- eslint-plugin-react-hooks: ESLint plugin for enforcing best practices with React hooks.
- eslint-plugin-react-refresh: Enables fast refresh for React components during development.
- vite: Build tool for lightning-fast development and bundling of React applications.

## Database

### User Schema

The User schema defines the structure of user data within the MongoDB database. It is created using the Mongoose library, which provides an elegant and flexible way to interact with MongoDB from Node.js applications.

Fields:
email: This field represents the email address of the user. It is marked as unique, ensuring that each user has a distinct email address.
ocrs: This field is an array containing ObjectIds that reference the "OCR" model. It establishes a relationship between users and OCR documents, allowing multiple OCRs to be associated with a single user.

Additional Options:
collection: Specifies the MongoDB collection name as "Users." Collections are analogous to tables in relational databases.
User Model: The schema is compiled into a Mongoose model named "USER," providing an interface to interact with the User collection.

### OCR Schema

The OCR schema defines the structure of OCR data stored in the MongoDB database. Similar to the User schema, it uses Mongoose to model the data.

Fields:
identification_number: This field represents a unique identification number associated with the OCR data. It is marked as unique to ensure each OCR document has a distinct identifier.
name: Represents the name of the individual associated with the OCR data.
last_name: Represents the last name of the individual. It is marked as unique to ensure uniqueness within the collection.
dateOfBirth: Represents the date of birth of the individual.
dateOfIssue: Represents the date when the OCR data was issued.
dateOfExpiry: Represents the date when the OCR data expires.
active: A boolean flag indicating whether the OCR data is currently active.

Additional Options:
timestamps: This option is set to true, which automatically adds "createdAt" and "updatedAt" fields to the documents, indicating when they were created and last updated.
collection: Specifies the MongoDB collection name as "Ocrs."
OCR Model: The schema is compiled into a Mongoose model named "OCR," providing an interface to interact with the OCR collection.

## Application Architecture

Client-server architecture
Backend: Express, Node.js, Mongoose, OCR libraries
Frontend: React, Vite

## Setup Instructions

1.Clone the project:
Bash
git clone <project_url>

2.Install dependencies:
Bash
cd backend
npm i
cd ../frontend
npm i

3.Create config.env in the backend folder:
PORT=3000
DATABASE=mongodb://<your_mongo_connection_string>

4.Obtain a MongoDB account and create a database.

5.Run the application:
Bash
cd backend
npm start
cd ../frontend
npm dev
