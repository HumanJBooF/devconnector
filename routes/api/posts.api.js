const router = require('express').Router();
const passport = require('passport');
const PostController = require('../../controllers').post

// @routes All routes start at /api/posts
// @access Private
router.route('/').post(passport.authenticate('jwt', { session: false }), PostController.createPost);
router.route('/like/:id').post(passport.authenticate('jwt', { session: false }), PostController.likePost);
router.route('/unlike/:id').post(passport.authenticate('jwt', { session: false }), PostController.unlikePost);
router.route('/comment/:id').post(passport.authenticate('jwt', { session: false }), PostController.addComment);
router.route('/:id').delete(passport.authenticate('jwt', { session: false }), PostController.deletePost);
router.route('/comment/:id/:comment_id').delete(passport.authenticate('jwt', { session: false }), PostController.deleteComment);

// @access Public
router.route('/').get(PostController.getPosts);
router.route('/:id').get(PostController.getPostByID);

module.exports = router;