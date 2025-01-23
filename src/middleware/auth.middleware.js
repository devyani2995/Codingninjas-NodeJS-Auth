// check user authenticated
export const checkAuthentication = function(req, res, next) {
    // if user is authenticaed then pass request to the next function(conlrollers action)

    if (req.isAuthenticated()) {
        console.log("check auth call,user is authenticated");
        return next();
    }
    req.flash('success', 'You have to login first!');
    return res.redirect('/login');
}

export const setAuthenticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current loggedIn user from the session cookie and we are just sending
        // it into  locals for the view
        res.locals.user = req.user;
    }
    next();
}