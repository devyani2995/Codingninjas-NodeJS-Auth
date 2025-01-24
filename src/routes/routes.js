// Import Express framework for creating the router and handling HTTP requests
import express from "express";
// Import controller for handling the home page logic
import { getHome } from "../controllers/home.controller.js";
// Import controllers for handling user-related routes
import { getLogin, getLogout, getRegister, getReset, postLogin, postRegister, postReset } from "../controllers/user.controller.js";
// Import Passport for authentication
import passport from "passport";
// Import middleware to verify user authentication
import { checkAuthentication } from "../middleware/auth.middleware.js";

// Create an instance of the Express router
const router = express.Router();

//Route to render the home page protected by authentication middleware
router.get('/',checkAuthentication,getHome);

// Route to render the login page
router.get('/login', getLogin);

// Route to render the registration page
router.get('/register', getRegister);

// Route to log out the user and redirect to the login page
router.get('/logout',getLogout);

//Route to render the reset password page protected by authentication middleware
router.get('/reset',checkAuthentication,getReset);

// Route to handle the user registration functionality
router.post('/register',postRegister);

// Route to handle the reset password functionality
router.post('/reset',postReset);

// Route to handle the login functionality with local authentication
router.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),postLogin)

// Route to initiate Google authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google authentication
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), postLogin);

export default router;