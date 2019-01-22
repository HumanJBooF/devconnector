const Post = require('../models/Post');
const validate = require('../validation');

const PostController = {

    // @desc Create post
    // @access Private
    createPost: (req, res) => {
        // Destructoring req.body && req.user
        // const { text, name, avatar } = req.body;
        const { errors, isValid } = validate.postInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        const { id } = req.user;
        const newPost = new Post({
            ...req.body, // Spread in req.body
            user: id
        });

        newPost.save().then(post => res.json(post))
    }
};

module.exports = PostController;