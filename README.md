# Todo-APP-MERN

This is a simple To-Do application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Prerequisites

*   Node.js and npm installed
*   MongoDB installed and running

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yuke001/Todo-APP-MERN.git
    cd Todo-APP-MERN
    ```

2.  **Backend Setup:**

    ```bash
    cd todo-backend
    npm install
    ```

    *   Create a `.env` file in the `todo-backend` directory and add the following environment variables:

        ```
        MONGO_URI=mongodb:""
        APPLICATION_URL=  # Update this for production!
        NODE_ENV=
        PORT= #Optional, if you want to specify the port
        ```

    *   Start the backend server:

        ```bash
        npm run dev
        ```

3.  **Frontend Setup:**

    ```bash
    cd ../todo-frontend
    npm install
    ```

    *   Create a `.env` file in the `todo-frontend` directory and add the following environment variable:

        ```
        VITE_API_URL=http://localhost:8000/api # Make sure it matches backend PORT
        ```

    *   Start the frontend development server:

        ```bash
        npm run dev
        ```

## Running the Application

*   The backend server will run on `http://localhost:8000` (or the port specified in your `.env` file).
*   The frontend application will run on `http://localhost:5173` (or the port specified by Vite).

## Notes

*   Make sure your MongoDB server is running.
*   Update the `APPLICATION_URL` environment variable in the backend `.env` file to the actual URL of your frontend application when deploying to production.
*   Ensure that the `VITE_API_URL` in the frontend `.env` matches the backend server URL.
