import passport from "passport";
import { UserModel } from "../models/user.js";
import crypto from 'crypto';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// Configure Passport to use Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,// Google Client ID
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret
    callbackURL: process.env.GOOGLE_CALLBACK_URL, // Callback URL for Google OAuth
    passReqToCallback: true, // Pass the request object to the callback function
},
    // Function to handle Google OAuth authentication
    async function (request, accessToken, refreseToken, profile, done) {
        console.log("profile:- ", profile);
        try {
            // Check if a user with the given email already exists in the database
            const user = await UserModel.findOne({ email: profile.emails[0].value });
            // If user exists, return the user object
            if (user) {
                return done(null, user);
            }
            if (!user) {
                // If user does not exist, create a new user in the database
                const newUser = await UserModel.create({
                    name: profile.displayName,// Use the name from the Google profile
                    email: profile.emails[0].value, // Use the email from the Google profile
                    password: crypto.randomBytes(20).toString('hex')// Generate a random password for the user
                })
                // If the new user is successfully created, return the new user object
                if (newUser) {
                    return done(null, newUser);
                }
            }
        } catch (error) {
            // Log an error during the process
            console.log('error in google stretegy passport', error);
        }
    }
));
// Export the configured Passport instance
export default passport;