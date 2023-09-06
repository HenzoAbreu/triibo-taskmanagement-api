# Task Management

A comprehensive RESTful API for task management, built using JavaScript, Node.js, Express, and MySQL.
This API incorporates JWT authentication and follows the MSC architecture pattern, providing
a robust and secure solution for handling tasks and user access control.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Introduction

Welcome to the Task Manager API – a comprehensive RESTful solution for efficient task management.
This API is built using JavaScript, Node.js, Express, and MySQL, featuring JWT
authentication and adhering to the MSC architecture pattern. Whether you're looking to streamline
your project workflow or enhance task organization, our API has you covered.

## Features

- User Registration: Allow new users to register accounts to use the task management system.

- User Authentication: Implement JWT-based authentication to ensure secure access to the API endpoints.

- Task Creation: Users can create new tasks with titles, descriptions and status.

- Task Listing: Retrieve a list of all tasks.

- Task Update: Allow users to modify task details, including title, description and status.

- Task Deletion: Users can delete tasks when they are no longer needed.

- Search Functionality: Implement a search feature to find tasks by keywords, or status.

- Error Handling: Implement robust error handling and provide meaningful error messages to users.

- API Documentation: Include detailed API documentation, including endpoints, request/response examples, and usage instructions.

- Database Integration: Integrate with MySQL to store and manage task data securely.

## Getting Started

Requirements:

node js v18.17+
mysql instance running

Clone the repository:

```
git clone https://github.com/HenzoAbreu/triibo-taskmanagement-api.git
```

Navigate to the project directory:

```
cd triibo-taskmanagement-api
```

Install dependencies:

```
npm install
```

Start the application:

```
npm run start
```

Configs:

Create .env file on router or use enviroment variable.
.env template:

```
MYSQL_HOST='mysql_host'
MYSQL_USER='mysql_user'
MYSQL_PASSWORD='mysql_password'
MYSQL_DATABASE='mysql_database_name'
ACCESS_TOKEN_SECRET='access_token_secret'
```

## Usage

Access http://localhost:3000/docs/swagger

Or import postman collection located on /docs/postman_collection.json

Auth Endpoints:

- `POST /auth/signup`: Register a new user.
- `POST /auth/signin`: Login to get your token for authentication.
- `POST /auth/change-password`: Change user password

User Endpoints:

- `PUT /user/email`: Update user email.
- `PUT /user/username`: Update user username.
- `DELETE /delete`: Delete a user.

Task Endpoints:

- `POST /task`: Create a task.
- `GET /task`: Retrieve a list of all tasks.
- `GET /task/search`: Retrieve a list of tasks filtered with a keyword.
- `GET /task/{uuid}`: Retrieve a specific task by UUID.
- `GET /task/{status}`: Retrieve a list of tasks with a specific status.
- `PUT /task/{id}`: Update a task by UUID.
- `DELETE /task/{id}`: Delete a task by UUID.

## Authentication

To get your token for authentication, just login after registering as a user. You must use your token for updating user info, creating a task, for searching your tasks, searching task by id, updating a task and deleting a task.
