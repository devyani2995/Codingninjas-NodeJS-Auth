// Controller to render home page
export const getHome = async (req, res) => {
    // if (req.isAuthenticated()) {
    //     return res.render('home');

    // }
    // return res.redirect('/login');
    return res.render('home');
}