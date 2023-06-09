const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
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

router.get("/post/:id", auth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes: ["description", "user_id", "post_id", "username"]
                }
            ]
        });
        const post = postData.get({ plain: true });
        const comments = post.comments
        console.log("Comment Data: ", comments);
        res.render("post", {
            post,
            comments,
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
                id: req.session.user_id
            },
            include: [{ model: Post, Comment }],
            attributes: { exclude: ["password"] }
        });
        console.log("User Data: ", userData)
        const user = userData.get({ plain: true });
        const posts = user.posts;
        console.log("User: ", user)
        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        console.log("Error :" + err);
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