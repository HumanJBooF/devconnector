const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

});

const Post = mongoose.model('posts', PostSchema);

module.exports = Post;