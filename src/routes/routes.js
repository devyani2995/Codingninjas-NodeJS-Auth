import express from "express";
import { getHome } from "../controllers/home.controller.js";
import { getLogin, getLogout, getRegister, getReset, postLogin, postRegister, postReset } from "../controllers/user.controller.js";
import passport from "passport";
import { checkAuthentication } from "../middleware/auth.middleware.js";
const router = express.Router();

//Route to render the home page
router.get('/',checkAuthentication,getHome);

//Route to render the login page
router.get('/login', getLogin);

//Route to render the register page
router.get('/register', getRegister);

//Route to logout from the page
router.get('/logout',getLogout);

//Route to render the reset page
router.get('/reset',checkAuthentication,getReset);

// Route to handle the signUp functionality
router.post('/register',postRegister);

// Route to handle the reste functionality
router.post('/reset',postReset);

// Route to handle the signIn functionality
router.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),postLogin)

export default router;