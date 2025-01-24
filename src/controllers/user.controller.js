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

// Controller to logout the user and redirect to the login page
export const getLogout = (req, res) => {
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        req.flash('success', 'You have successfully logged out');
        res.redirect('/login');
    })
}

// Controller to handle Login form submission
export const postLogin = (req, res) => {
    console.log('req.user', req.user);
    // Flash a success message and redirect to the home page
    req.flash('success', 'User logged in successfully');
    return res.redirect('/');
}

// Controller to handle user registration
export const postRegister = async (req, res) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        // check if password and confirm password match or not
        if (password !== confirm_password) {
            req.flash('error', 'Password and Confirm password should match');
            return res.redirect('/register');
        }
        // Check if a user with the same email already exists  
        const existUser = await UserModel.findOne({ email: email });
        if (existUser) {
            req.flash('error', 'User is already registered');
            return res.redirect('/register')
        }

        // Hash the user's password for secure storage in database
        const hashedPassword = await bcrypt.hash(password, 12)
        // Create a new user document in the database
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        // Flash success message and redirect to the login page
        req.flash('success', 'User registered successfully');
        return res.redirect('/login');

    } catch (error) {
        // Log errors to the console
        console.log('oppes something went wrong');
    }
}

// Controller to handle password reset requests
export const postReset = async (req, res) => {
    const { email, old_password, new_password } = req.body;

    // Find the user by their email
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        req.flash('error', 'User not exist');
        return res.redirect('/reset');
    }
    // Check if old password matches the user's current password
    const result = await bcrypt.compare(old_password, user.password);
    if (result === false) {
        req.flash('error', 'Current password does not match');
        return res.redirect('/reset');
    }
    // Ensure the new password is not same as the old password
    if (old_password === new_password) {
        req.flash('error', 'Old password and New password should not be same');
        return res.redirect('/reset');
    }
    // Hash the new password and update the user's password
    const newHashedPassword = await bcrypt.hash(new_password, 12)
    user.password = newHashedPassword;
    // Save the updated user document
    user.save();
    // Log the user out after password reset and redirect to the login page
    req.logout(function (error) {
        if (error) {
            return next(error);
        }
        req.flash('success', 'Password has been updated successfully!');
        res.redirect('/login');
    });
}