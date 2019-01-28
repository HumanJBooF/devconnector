const router = require('express').Router();
const passport = require('passport');
const userController = require('../../controllers').user;

// @routes all routes start at /api/users
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), userController.current);

// @access Public
router.post('/register', userController.findOne);
router.post('/login', userController.login);



module.exports = router;