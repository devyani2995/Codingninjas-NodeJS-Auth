import { UserModel } from "../models/user.js";
import bcrypt from 'bcrypt';

// Controller to render Login page
export const getLogin = (req, res) => {
    return res.render('login');
}

// Controller to render Register page
export const getRegister = (req, res) => {
    return res.render('register');
}

// Controller to render Reset page
export const getReset = (req, res) => {
    return res.render('reset');
}

// Controller to logout from page
export const getLogout = (req, res) => {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        req.flash('success', 'You have successfully logged out');
        res.redirect('/login');
    })
}

export const postLogin = (req, res) => {
    console.log('req.user', req.user);
    req.flash('success', 'User logged in successfully');
    return res.redirect('/');
}

export const postRegister = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        // check password and confirm password id match or not

        if (password !== confirm_password) {
            req.flash('error', 'Password and Confirm password should not match');
            return res.redirect('/register');
        }
        // check if user is exist already in database  
        const existUser = await UserModel.findOne({ email: email });
        if (existUser) {
            req.flash('error', 'User is already registered');
            return res.redirect('/register')
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await UserModel.create({
            name: name,
            email: email,
            // password: password
            password: hashedPassword
        });
        user.save();
        req.flash('success', 'User registered successfully');
        return res.redirect('/login');

    } catch (error) {
        console.log('oppes something went wrong');
    }
}

export const postReset = async (req, res) => {
    const { email, old_password, new_password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (!user) {
        req.flash('error', 'User not exist');
        return res.redirect('/reset');
    }

    const result = await bcrypt.compare(old_password, user.password);
    if (result === false) {
        req.flash('error', 'Current password does not match');
        return res.redirect('/reset');
    }

    if (old_password === new_password) {
        req.flash('error', 'Old password and New password should not be same');
        return res.redirect('/reset');
    }
    const newHashedPassword = await bcrypt.hash(new_password, 12)
    user.password = newHashedPassword;
    user.save();
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        req.flash('success', 'Password has been updated successfully!');
        res.redirect('/login');
    });
}