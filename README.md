# Real-time Task Management System

## Overview

This is a Real-time Task Management System allows users to manage tasks with real-time updates (not fully implemented) and persistent storage. It uses WebSocket for real-time communication and AWS DynamoDB for data persistence. TypeScript is employed throughout the project for enhanced type safety.

## Features

- **Task Management**: Users can create, read, update, and delete tasks.
- **Real-Time Updates**: Tasks are updated in real-time across all clients using WebSocket. (not fully implemented)
- **Data Persistence**: Tasks are stored in AWS DynamoDB.

## Technology Stack

### Back-End
- **Node.js**: JavaScript runtime for server-side code.
- **Express**: Web framework for the RESTful API.
- **TypeScript**: Superset of JavaScript with type safety.
- **AWS SDK**: For interacting with AWS services.
- **AWS DynamoDB**: NoSQL database for task storage.
- **WebSocket**: For real-time communication.

### Front-End
- **React**: Library for building the user interface.
- **TypeScript**: Superset of JavaScript with type safety.

## Project Setup

### Back-End Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/mjj677/ciptex-interview-task.git
    cd ciptex-interview-task
    cd backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Configure AWS DynamoDB**:
   - Ensure AWS credentials are configured on your machine.
   - Set up your DynamoDB table as needed.

4. **Ensure .env setup**:
    - Ensure you have a .env file in the root of the backend folder with the following format - 
    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_REGION=

5. **Run the server**:
    ```sh
    npm start
    ```

6. **Ensure the server is running on port 3000** (or adjust as needed).

### Front-End Setup

2. **Install dependencies**:
    ```sh
    cd frontend
    npm install
    ```

3. **Run the development server**:
    ```sh
    npm run dev
    ```

4. **Ensure the front-end is running on port 5173** (or adjust the WebSocket URL in the front-end code if necessary).

## API Endpoints

- **GET** `/tasks` - Retrieve all tasks.
- **POST** `/tasks` - Create a new task.
- **PATCH** `/tasks/:id` - Update an existing task by ID.
- **DELETE** `/tasks/:id` - Delete a task by ID.

## WebSocket Integration

The WebSocket server is set up to:

- **Broadcast task updates** to all connected clients. (WIP)
- **Send a welcome message** upon client connection.

**Note:** The WebSocket functionality is partially implemented. While the server-side WebSocket setup is present, real-time updates are not fully functional. Further debugging and development are needed to ensure complete functionality.

## Testing

- Endpoints are fully tested using Jest and Supertest.
- Verify the back-end REST API endpoints using tools like Postman.
- Check the WebSocket functionality in the browser’s developer tools to ensure proper connection and messaging.

## Troubleshooting

- **WebSocket Issues**: Confirm the WebSocket server is properly set up and check connection status in the browser’s developer tools.
- **CORS Issues**: Ensure CORS settings on the server allow requests from the client application.

## Future Improvements

- **Complete WebSocket Implementation**: Finalise real-time updates for a seamless user experience.
- **Error Handling**: Enhance error handling and validation on both front-end and back-end components.
- **Testing**: Add comprehensive integration tests for both front-end and back-end components.
