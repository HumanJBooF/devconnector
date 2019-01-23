const router = require('express').Router();
const passport = require('passport');
const PostController = require('../../controllers').post

// @routes All routes start at /api/posts
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), PostController.createPost);
router.post('/like/:id', passport.authenticate('jwt', { session: false }), PostController.likePost);
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), PostController.unlikePost);
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), PostController.addComment);
router.delete('/:id', passport.authenticate('jwt', { session: false }), PostController.deletePost);
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), PostController.deleteComment);

// @access Public
router.get('/', PostController.getPosts);
router.get('/:id', PostController.getPostByID);

module.exports = router;