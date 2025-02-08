import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserModel } from "../models/user.js";
import bcrypt from 'bcrypt';

// Configure Passport to use Local Strategy for authentication
passport.use(new LocalStrategy({
    usernameField: 'email',  // Specify email as the username field
    passReqToCallback: true  // Pass the request object to the callback function
},
    // Function to authenticate a user
    async function (req, email, password, done) {
        try {
            // Find the user by email in the database
            let user = await UserModel.findOne({ email: email });
            // If user is not found, flash an error message and return
            if (user === null) {
                req.flash('error', 'Invalid email');
                return done(null, false);
            }
            // Compare the provided password with the user password in the database
            const result = await bcrypt.compare(password, user.password);
            // If the password does not match, flash an error message and return
            if (result === false) {
                req.flash('error', 'Invalid password');
                return done(null, false);
            }
            // If authentication is successful, return the user object
            return done(null, user);

        } catch (error) {
            // Log errors that occur during the authentication process
            console.log(error, "something is wrong");
            return done(error);
        }
    }));

// Serialize user information into the session
passport.serializeUser(function (user, done) {
    if (user) {
        return done(null, user.id); //Store only id in the session
    } else {
        return done(null, false);
    }
});

// Deserialize user information from the session
passport.deserializeUser(async function (id, done) {
    try {
        // Find the user by ID in the database
        let user = await UserModel.findById(id);
        // If the user not is found, return false
        if (!user) {
            return done(null, false);
        }
        // If the user is found, return the user object
        return done(null, user);
    } catch (error) {
        console.log("Error in finding user in db during desrilalize");
        return done(error);
    }
});

export default passport;