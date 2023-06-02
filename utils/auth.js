// login authentication
const auth = (req, res, next) => {
    console.log("running Auth...")
    if (!req.session.logged_in) {
        res.redirect("/login");
    }
    else {
        console.log("User Authorized");
        next();
    }
};

module.exports = auth