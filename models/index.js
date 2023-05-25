const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

Post.belongsTo(User, {
    foreignKey: "user_id",
});

Post.hasMany(Comment, {
    foreignKey: "comment_id",
    onDelete: "CASCADE"
});

Comment.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Post, Comment }