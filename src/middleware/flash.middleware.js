// Middleware to set flash messages on res.locals for access in views
export const setflash = function (req, res, next) {
    // Attach flash messages success and error to res.locals
    // This makes the flash messages available in the rendered view templates
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }
    // Pass control to the next middleware or controller function
    next();
}