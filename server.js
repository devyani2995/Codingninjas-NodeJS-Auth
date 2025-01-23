//Importing express framework for building the server
import express from 'express';
//Middleware for using EJS layouts
import ejsLayouts from 'express-ejs-layouts';
//Path module to handle file and directory paths
import path from 'path';
//Function to connect to the MongoDB database
import { connectUsingMongoose } from './src/config/mongooseConfig.js';
import router from './src/routes/routes.js';
import dotenv from "dotenv";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import { setflash } from './src/middleware/flash.middleware.js';
import passport from 'passport';
import LocalStrategy from './src/middleware/passport-local.middleware.js';
import { UserModel } from './src/models/user.js';
import { setAuthenticatedUser } from './src/middleware/auth.middleware.js';
import bcrypt from 'bcrypt';


dotenv.config();

//Initialize the Express application
const server = express();

//Using static file
server.use(express.static('public'));

//to specify we are using cookie parser to parse our cookie
server.use(cookieParser());

//configure the session
server.use(session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: (1000 * 60 * 100) }
}));

//Parse form data so that after submitting form data we get that data on server side
server.use(express.urlencoded({ extended: true }));

//Setup view engine
server.set("view engine", "ejs");

//Specify the folder or directory of views 
server.set("views", path.join(path.resolve(), 'src', 'views'));

//Wrapping ejs layouts into server
server.use(ejsLayouts);

server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use(setflash);

// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passReqToCallback: true
// },
//     async function (req, email, password, done) {
//         try {
//             // find user and establish identity
//             let user = await UserModel.findOne({ email: email });
//             if (user === null) {
//                 req.flash('error', 'Invalid email');
//                 return done(null, false);
//             }
//             const result = await bcrypt.compare(password, user.password);
//             if (result === false) {
//                 req.flash('error', 'Invalid password');
//                 return done(null, false);
//             }

//             return done(null, user);

//         } catch (error) {
//             // req.flash('error', error);
//             console.log(error, "something is wrong");
//             return done(error);
//         }
//     }));

// passport.serializeUser(function (user, done) {
//     if (user) {
//         return done(null, user.id); //it sends only id in the session
//     } else {
//         return done(null, false);
//     }
// });

// passport.deserializeUser(async function (id, done) {
//     try {

//         let user = await UserModel.findById(id);
//         if (!user) {
//             return done(null, false);
//         }
//         return done(null, user);
//     } catch (error) {
//         console.log("Error in finding user in db during desrilalize");
//         return done(error);
//     }
// });

server.use(setAuthenticatedUser);

server.use('/', router);

//Listen port
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
    connectUsingMongoose();
});