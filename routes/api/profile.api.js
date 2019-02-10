const router = require('express').Router();
const passport = require('passport');
const ProfileController = require('../../controllers').profile;

// @routes All routes start at /api/profile
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), ProfileController.findOne);
router.post('/', passport.authenticate('jwt', { session: false }), ProfileController.getFields);
router.post('/experience', passport.authenticate('jwt', { session: false }), ProfileController.addExperience);
router.post('/education', passport.authenticate('jwt', { session: false }), ProfileController.addEducation);
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), ProfileController.deleteExp);
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), ProfileController.deleteEdu);
router.delete('/', passport.authenticate('jwt', { session: false }), ProfileController.deleteUserandProfile);

// @access Public
router.get('/handle/:handle', ProfileController.getByHandle);
router.get('/user/:user_id', ProfileController.getById);
router.get('/all', ProfileController.getAllProfiles);
router.get('/github/:username', ProfileController.getGithubRepos);

module.exports = router;