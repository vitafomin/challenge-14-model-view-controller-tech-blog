const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const auth = require("../../utils/auth");

router.post("/", auth, async (req, res) => {
  console.log("post req body: " + JSON.stringify(req.body));
  const test = JSON.stringify({ ...req.body, user_id: req.session.user_id });
  console.log("test: " + test);
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log("error: " + err);
    res.status(400).send(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  console.log("this is the body", req.body);
  try {
    const postData = await Post.update(
      { ...req.body },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!postData) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  console.log("delete route hit");
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No post found" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/:id", auth, async (req, res) => {
  console.log("comment route working");
  try {
    console.log(req.params.id);
    // we first have to query our DB for the USER name by ID
    const currentUser = await User.findOne({ 
      where: { id: req.session.user_id }
    });
    console.log("Current User: ", currentUser.dataValues);
    
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
      username: currentUser.dataValues.email
    });
    if (!commentData) {
      res.status(404).send({ message: "Post not found" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
