const router = require('express').Router();
const userRoutes = require('./users.api');
const postRoutes = require('./posts.api');
const profileRoutes = require('./profile.api');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/profile', profileRoutes);

module.exports = router;