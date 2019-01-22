const router = require('express').Router();
const passport = require('passport');
const PostController = require('../../controllers').post

// @routes All routes start at /api/posts
// @access Private
router.route('/').post(passport.authenticate('jwt', { session: false }), PostController.createPost);

// @access Public

module.exports = router;