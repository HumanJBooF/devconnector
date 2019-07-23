const Post = require('../models/Post');
const validate = require('../validation');

const PostController = {
    // @route GET /api/posts
    // @desc Get posts
    // @access Public
    getPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort({ date: -1 });
            res.json(posts);
        } catch (err) {
            res.status(404).json({ noPosts: 'No posts have been found!' });
        }
    },
    // @route GET /api/posts/:id
    // @desc Get post by id
    // @access Get public
    getPostByID: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(id);
            res.json(post);
        } catch (err) {
            res.status(404).json({ noPost: 'No post found with that id!' });
        }
    },
    // @route POST /api/posts/
    // @desc Create post
    // @access Private
    createPost: async (req, res) => {
        try {
            const { errors, isValid } = validate.postInput(req.body);
            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors)
            }
            const { id, name, avatar } = req.user;
            const { text } = req.body;
            const newPost = new Post({ user: id, name, avatar, text });
            const post = await newPost.save();
            res.json(post);
        } catch (err) {
            console.log(err);
        }
    },
    // @route DELETE /api/posts/:id
    // @desc Delete post by id
    // @Private
    deletePost: async (req, res) => {
        try {
            const { id } = req.params;
            const post = await Post.findById(id)
            if (post.user.toString() !== req.user.id) {
                return res.status(404).json({ noAuth: 'User not authorized to delete this post!' });
            }
            post.remove().then(() => res.json({ success: true }));
        } catch (err) {
            res.status(404).err({ noPost: 'No post was found!' });

        }
    },
    // @route POST /api/posts/like/:id
    // @desc Like post
    // @access Private
    likePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { id: userID } = req.user;
            const post = await Post.findById(id);
            const checkLike = post.likes.filter(like => (like.user.toString() === userID)).length > 0;
            if (checkLike) {
                return res.status(400).json({ liked: 'USer already liked this post!' })
            }
            post.likes.unshift({ user: userID });
            post.save().then(post => res.json(post));
        } catch (err) {
            res.status(404).json({ noPost: 'No post found to like!' })
        }
    },
    // @route POST /api/posts/unlike/:id
    // @desc Unlike post
    // @access Private
    unlikePost: async (req, res) => {
        try {
            const { id } = req.params;
            const { id: userID } = req.user;
            const post = await Post.findById(id);
            const checkLike = post.likes.filter(like => (like.user.toString() === userID)).length === 0;

            if (checkLike) {
                return res.status(400).json({ liked: 'You have not liked this post!' });
            }
            // Get remove index
            const removeIndex = post.likes
                .map(item => item.user.toString())
                .indexOf(userID);
            // Splice it out
            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        } catch (err) {
            res.status(404).json({ noPost: 'No post found!' });
        }
    },
    // @route POST /api/posts/comment/:id
    // @desc Add comment to post
    // @access Private
    addComment: async (req, res) => {
        try {
            const { errors, isValid } = validate.postInput(req.body);
            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors)
            }

            const { id } = req.params;
            const { id: userID, name, avatar } = req.user;
            const { text } = req.body;
            const post = await Post.findById(id);
            const newComment = {
                user: userID,
                name,
                avatar,
                text
            };
            post.comments.unshift(newComment);
            post.save().then(post => res.json(post));
        } catch (err) {
            res.status(404).json({ noPost: 'Post not found!' })
        }
    },
    // @route DELETE /api/posts/comment/:id/:comment_id
    // @desc Delete comment
    // @access Private
    deleteComment: async (req, res) => {
        try {
            const { id, comment_id } = req.params;
            const post = await Post.findById(id);
            const checkComment = post.comments.filter(comment => {
                return comment._id.toString() === comment_id
            }).length === 0;

            if (checkComment) res.status(404).json({ noComment: 'That comment does not exist' });

            // Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(comment_id);
            // Splice it out
            post.comments.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
        } catch (err) {
            res.status(404).json({ noPost: 'Post not found!' })
        }
    }
};

module.exports = PostController;