import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserModel } from "../models/user.js";
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},
    async function (req, email, password, done) {
        console.log("passport call",email,password)
        try {
            // find user and establish identity
            let user = await UserModel.findOne({ email: email });
            if (user === null) {
                req.flash('error', 'Invalid email');
                return done(null, false);
            }
            const result = await bcrypt.compare(password, user.password);
            if (result === false) {
                req.flash('error', 'Invalid password');
                return done(null, false);
            }

            return done(null, user);

        } catch (error) {
            // req.flash('error', error);
            console.log(error, "something is wrong");
            return done(error);
        }
    }));

passport.serializeUser(function (user, done) {
    if (user) {
        return done(null, user.id); //it sends only id in the session
    } else {
        return done(null, false);
    }
});

passport.deserializeUser(async function (id, done) {
    try {

        let user = await UserModel.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.log("Error in finding user in db during desrilalize");
        return done(error);
    }
});

export default passport;