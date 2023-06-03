const router = require("express").Router();
const { User } = require("../../models");

router.post("/signup", async (req, res) => {
    console.log("req body: ", req.body)
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    console.log("Body: ", req.body);
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        console.log("Found User: ", userData);
        
        if (!userData) {
            res.status(400).send({ message: "Incorrect email or password" });
            return;
        }

      
        const validPassword = await userData.checkPassword(req.body.password);
        console.log("Password condition: ", validPassword);
        
        if(!validPassword) {
            res.status(400).json({ message: "Incorrect email or password" });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Your logged in!" });
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else {
        res.status(404).end()
    }
});

module.exports = router;