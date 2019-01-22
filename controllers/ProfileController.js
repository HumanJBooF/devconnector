const Profile = require('../models/Profile');
const User = require('../models/User');
const validate = require('../validation'); // Load validations

const ProfileController = {
    // @desc Get current users profile
    // @access Private
    findOne: (req, res) => {
        const { id } = req.user;
        const errors = {};
        Profile.findOne({ user: id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    },

    // @desc Create or edit user profile
    // @access Private
    getFields: (req, res) => {
        const { errors, isValid } = validate.profileInput(req.body);
        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Destructuring req.user && req.body for the skills array and social object
        const { id } = req.user;
        const { skills, youtube, twitter, facebook, linkedin, instagram } = req.body;
        const profileFields = {
            user: id,
            ...req.body, // spreading the rest of req.body
            skills: skills.split(',')
                .map(skill => skill.trim()) // Splitting skills by coma and removing duplicates in skills array
                .filter((val, i, arr) => arr.indexOf(val) === i),
        };

        // Social
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        Profile.findOne({ user: profileFields.user })
            .then(profile => {
                if (profile) {
                    // Update
                    Profile.findOneAndUpdate(
                        { user: profileFields.user },
                        { $set: profileFields },
                        { new: true })
                        .then(profile => res.json(profile))
                        .catch(err => res.json(err));
                } else {
                    // Create
                    // Check if handle exist
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'That handle already exist';
                                return res.status(400).json(errors);
                            }
                            // Save Profile
                            new Profile(profileFields).save()
                                .then(profile => res.json(profile))
                                .catch(err => res.json(err));
                        }).catch(err => res.status(404).json(err));
                }
            })
    },

    // @desc Get all profiles
    // @access Public
    getAllProfiles: (req, res) => {
        const errors = {};
        Profile.find()
            .populate('user', ['name', 'avatar'])
            .then(profiles => {
                if (!profiles) {
                    errors.profile = 'There are no profiles'
                    return res.status(404).json(errors);
                }
                res.json(profiles)
            }).catch(err => res.status(404).json({ profiles: 'There are no profiles' }))
    },

    // @desc Get profile by handle
    // @access Public
    getByHandle: (req, res) => {
        const { handle } = req.params; // Destructuring req.params
        const errors = {};
        Profile.findOne({ handle: handle })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = `There is no profile with the handle: ${handle}`
                    res.status(404).json(errors);
                }

                res.json(profile);
            }).catch(err => res.status(404).json(err));
    },

    // @desc Get profile by user ID
    // @access Public
    getById: (req, res) => {
        const { user_id } = req.params; // Destructuring req.params
        Profile.findOne({ user: user_id })
            .populate('user', ['name', 'avatar'])
            .then(profile => res.json(profile))
            .catch(err => res.status(404).json({ profile: 'There is no profile for this user' }));
    },

    // @desc Add experience to profile
    // @access Private
    addExperience: (req, res) => {
        const { id } = req.user; // Destructuring req.user
        const { errors, isValid } = validate.experienceInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: id })
            .then(profile => {
                const newExp = {
                    ...req.body // spread req.body experience to newExp object
                }
                // Add to exp array
                profile.experience.unshift(newExp);
                profile.save().then(profile => res.json(profile))
                    .catch(err => res.json(err));
            });
    },

    // @desc Add education to profile
    // @access Private
    addEducation: (req, res) => {
        const { id } = req.user; // Destructuring req.user
        const { errors, isValid } = validate.educationInput(req.body);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: id })
            .then(profile => {
                const newEdu = {
                    ...req.body // spread req.body experience to newExp object
                }
                // Add to exp array
                profile.education.unshift(newEdu);
                profile.save().then(profile => res.json(profile))
                    .catch(err => res.json(err));
            });
    },

    // @desc Delete experience from profile
    // @access Private
    deleteExp: (req, res) => {
        // Destructuring req.user && req.params
        const { id } = req.user;
        const { exp_id } = req.params;
        Profile.findOne({ user: id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(exp_id);
                // Splice out of array
                profile.experience.splice(removeIndex, 1);
                profile.save().then(profile => res.json(profile))
            }).catch(err => res.status(404).json(err));
    },

    // @desc Delete education from profile
    // @access Private
    deleteEdu: (req, res) => {
        // Destructuring req.user && req.params
        const { id } = req.user;
        const { edu_id } = req.params;
        Profile.findOne({ user: id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(edu_id);
                // Splice out of array
                profile.education.splice(removeIndex, 1);
                profile.save().then(profile => res.json(profile))
            }).catch(err => res.status(404).json(err));
    },

    // @desc Delete user and profile
    // @access Private
    deleteUserandProfile: (req, res) => {
        const { id } = req.user;
        Profile.findOneAndRemove({ user: id })
            .then(() => {
                User.findOneAndRemove({ _id: id })
                    .then(() => res.json({ success: true }))
            }).catch(err => res.json(err));
    }
};

module.exports = ProfileController;