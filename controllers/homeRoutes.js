const router = require("express").Router();
const { User, Post } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                  //  attributes: ["email"]
                }
            ]
        });
        // this line serializes the data
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).send(err);
    }
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["email"]
                }
            ]
        });
        const post = postData.get({ plain: true });
        res.render("post", {
            post,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        res.status(500).send(err)
    }
});

router.get("/dashboard", auth, async (req, res) => {
    console.log("Hit Dashboard Route...")
    console.log("Session: ", req.session);
    try {
        const userData = await User.findOne({ 
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: Post }],
            attributes: { exclude: ["password"] }
        });
        console.log("User Data: ", userData)
        const user = userData.get({ plain: true });
        console.log("User: ", user)
        res.render("dashboard", {
            user,
            logged_in: true
        });
    }
    catch (err) {
        res.status(500).send({message: "Failed to go to dashboard"});
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    else {
        res.render("login");
    }
});
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    else {
        res.render("signup");
    }
});

module.exports = router;