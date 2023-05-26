const router = require("express").Router();
const { Post } = require("../../models");
const auth = require("../../utils/auth");

router.post("/", auth, async (req, res) => {
    try {
        const newPost = await Post.create({ ...req.body, user_id: req.session.user_id });
        res.status(200).send(newPost);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const postData = await Post.update({ 
            where: {
            id: req.params.id,
            user_id: req.session.user_id
        },
    });
    if (!postData) {
        res.status(404).send({ message: "Post not found" });
        return;
    }
    res.status(200).send(postData);   
    }
    catch (err) {
        res.status(400).send(err)
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).send({ message: "No post found" });
            return;
        }
        res.status(200).send(postData);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

