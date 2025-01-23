// creat a middleware to set flesh message on res.locals
export const setflash = function(req, res, next) {

    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error')
    }

    next();
}