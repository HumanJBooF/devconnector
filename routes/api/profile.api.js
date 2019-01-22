const router = require('express').Router();
const passport = require('passport');
const ProfileController = require('../../controllers').profile;

// @routes All routes start at /api/profile
// @access Private
router.route('/').get(passport.authenticate('jwt', { session: false }), ProfileController.findOne);
router.route('/').post(passport.authenticate('jwt', { session: false }), ProfileController.getFields);
router.route('/experience').post(passport.authenticate('jwt', { session: false }), ProfileController.addExperience);
router.route('/education').post(passport.authenticate('jwt', { session: false }), ProfileController.addEducation);
router.route('/experience/:exp_id').delete(passport.authenticate('jwt', { session: false }), ProfileController.deleteExp);
router.route('/education/:edu_id').delete(passport.authenticate('jwt', { session: false }), ProfileController.deleteEdu);
router.route('/').delete(passport.authenticate('jwt', { session: false }), ProfileController.deleteUserandProfile);

// @access Public
router.route('/handle/:handle').get(ProfileController.getByHandle);
router.route('/user/:user_id').get(ProfileController.getById);
router.route('/all').get(ProfileController.getAllProfiles);

module.exports = router;