// Importing express framework for building the server
import express from 'express';
// Middleware for using EJS layouts
import ejsLayouts from 'express-ejs-layouts';
// Path module to handle file and directory paths
import path from 'path';
// Function to connect to the MongoDB database
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
// Import router to handle route
import router from './src/routes/routes.js';
// Environment variables configuration
import dotenv from "dotenv";
// Session management middleware
import session from 'express-session';
// Cookie parser middleware
import cookieParser from 'cookie-parser';
// Flash messages middleware for notifications
import flash from 'connect-flash';
// Custom middleware to set flash messages
import { setflash } from './src/middleware/flash.middleware.js';
// Import passport for user authentication
import passport from 'passport';
// Local authentication strategy
import LocalStrategy from './src/middleware/passport-local.middleware.js';
// Google authentication strategy
import GoogleStrategy from './src/middleware/passport-google-auth.middleware.js';
// Custom middleware for setting authenticated user
import { setAuthenticatedUser } from './src/middleware/auth.middleware.js';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const server = express();

// Using static file from the public directory
server.use(express.static('public'));

// To specify we are using cookie parser to parse our cookie
server.use(cookieParser());

// Configure the session
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: (1000 * 60 * 100) } // Session expiry time (100 minutes)
}));

//Parse form data so that after submitting form data we get that data on server side
server.use(express.urlencoded({ extended: true }));

//Setup view engine
server.set("view engine", "ejs");

//Specify the folder or directory of views 
server.set("views", path.join(path.resolve(), 'src', 'views'));

//Wrapping ejs layouts into server
server.use(ejsLayouts);

// Initialize Passport for authentication
server.use(passport.initialize());
// Maintain session with Passport
server.use(passport.session());

// Set up flash messages
server.use(flash());
// Custom middleware to set flash messages
server.use(setflash);

// Use custom middleware to set the authenticated user in the response locals
server.use(setAuthenticatedUser);

// // Define the routing for the application to redirect to user routes
server.use('/', router);

// Start the server and listen for requests on the specified port
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    // Connect to the MongoDB database
    connectUsingMongoose();
});