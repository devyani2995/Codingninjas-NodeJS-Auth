// Middleware to check if the user is authenticated
export const checkAuthentication = function(req, res, next) {
    // Check if user is authenticaed then pass request to the next middleware or conlroller function
    if (req.isAuthenticated()) {
        return next();
    }
     // If not authenticated, flash a message and redirect to the login page
    req.flash('success', 'You have to login first!');
    return res.redirect('/login');
}

// Middleware to set the authenticated user in the response locals
export const setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // Attach the current logged-in user from the session to `res.locals`
        // This allows the user information to be accessible in views
        res.locals.user = req.user;
    }
    // Pass control to the next middleware or controller function
    next();
}