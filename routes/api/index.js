const router = require('express').Router();
const userRoutes = require('./users');
const postRoutes = require('./posts');
const profileRoutes = require('./profile');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/profile', profileRoutes);

module.exports = router;