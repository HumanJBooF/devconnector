const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    text: { type: String, required: true }
});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;