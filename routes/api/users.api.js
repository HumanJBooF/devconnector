const router = require('express').Router();
const userController = require('../../controllers').user;
const passport = require('passport');

// @routes all routes start at /api/users
// @access Private
router.route('/current').get(passport.authenticate('jwt', { session: false }), userController.current);

// @access Public
router.route('/register').post(userController.findOne);
router.route('/login').post(userController.login);



module.exports = router;