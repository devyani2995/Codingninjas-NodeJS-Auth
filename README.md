# NodeJS-Auth

## Project Description
NodeJS-Auth is a simple authentication system built with Node.js, Express,EJS and MongoDB. It provides user registration, login, password reset, and authentication functionalities using Passport.js with local and Google OAuth strategies.

## Features
- User registration
- User login
- Password reset
- Password hashing with bcrypt
- Local authentication with Passport.js
- Google OAuth authentication with Passport.js
- Flash messages for notifications

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/devyani2995/Codingninjas-NodeJS-Auth.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Codingninjas-NodeJS-Auth
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
## Usage
1. Start the server:
    ```sh
    npm start
    ```
2. The server will be running on http://localhost:3000 (or specified port in .env file)

## Endpoints
- `GET /` - Home page (requires authentication)
- `GET /login` - Render login page
- `POST /login` - Login a user
- `GET /register` - Render registration page
- `POST /register` - Register a new user
- `GET /reset` - Render reset password page (requires authentication)
- `POST /reset` - Reset user password
- `GET /logout` - Logout the user
- `GET /auth/google` - Initiate Google authentication
- `GET /auth/google/callback` - Google authentication callback

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Passport.js (Local and Google OAuth strategies)
- bcrypt
- EJS
- connect-flash
- express-session

## Hosted URL

https://codingninjas-nodejs-auth.onrender.com