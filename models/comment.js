const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
        value: Number,
        postId: String,
        userId: String,
        username: String,
        comment: {
            type: String,
            required: true
        }
    },{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;