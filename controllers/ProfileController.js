const Profile = require('../models/Profile');
const User = require('../models/User');
const validate = require('../validation'); // Load validations
const axios = require('axios');
const keys = require('../config/keys');

const ProfileController = {
    // @route GET /api/profile/
    // @desc Get current users profile
    // @access Private
    findOne: async (req, res) => {
        try {
            const { id } = req.user;
            const errors = {};
            const profile = await Profile.findOne({ user: id });
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }
            res.json(profile);
        } catch (err) {
            res.status(404).json(err);
        }
    },
    //@route POST /api/profile
    // @desc Create or edit user profile
    // @access Private
    getFields: async (req, res) => {
        try {
            const { errors, isValid } = validate.profileInput(req.body);
            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            // Destructuring req.user && req.body
            const { id } = req.user;
            const { handle, company, location, bio, github, status, website, skills } = req.body;
            const social = ['youtube', 'twitter', 'facebook', 'linkedin', 'instagram'];
            const profileFields = {
                user: id,
                handle,
                company,
                location,
                bio,
                github,
                status,
                // Splitting skills by coma and removing duplicates in skills array
                skills: skills.split(',')
                    .map(skill => skill.trim())
                    .filter((val, i, arr) => arr.indexOf(val) === i),
            };

            // Checking if the links are there
            // If they are, we check if they have https:// in front 
            // If they don't we add them
            if (website) {
                (!/^https?:\/\//i.test(website))
                    ? profileFields.website = `https://${website}`
                    : profileFields.website = website
            } else profileFields.website = "";

            // Social
            profileFields.social = {};
            social.forEach(field => {
                if (req.body[field]) {
                    (!/^https?:\/\//i.test(field))
                        ? profileFields.social[field] = `https://${req.body[field]}`
                        : profileFields.social[field] = req.body[field]
                } else profileFields.social[field] = '';
            })

            const profileFound = await Profile.findOne({ user: profileFields.user });
            if (profileFound) {
                const profile = await Profile.findOneAndUpdate(
                    { user: profileFields.user },
                    { $set: profileFields },
                    { new: true });
                res.json(profile);
            } else {
                const profileFound = await Profile.findOne({ handle: profileFields.handle });
                if (profileFound) {
                    errors.handle = 'That handle already exist';
                    return res.status(400).json(errors);
                }
                // Save Profile
                const profile = await new Profile(profileFields).save();
                res.json(profile);
            }
        } catch (err) {
            res.json(err)
        }
    },
    // @route GET /api/profile/all
    // @desc Get all profiles
    // @access Public
    getAllProfiles: async (req, res) => {
        try {
            const errors = {};
            const profiles = await Profile.find().populate('user', ['name', 'avatar']);
            if (!profiles) {
                errors.profile = 'There are no profiles'
                return res.status(404).json(errors);
            }
            res.json(profiles);
        } catch (err) {
            res.status(404).json({ profiles: 'There are no profiles' })
        }
    },
    // @route GET /api/profile/handle/:handle
    // @desc Get profile by handle
    // @access Public
    getByHandle: async (req, res) => {
        try {
            const { handle } = req.params; // Destructuring req.params
            const errors = {};
            const profile = await Profile.findOne({ handle: handle }).populate('user', ['name', 'avatar']);
            if (!profile) {
                errors.noprofile = `There is no profile with the handle: ${handle}`
                res.status(404).json(errors);
            }

            res.json(profile);
        } catch (err) {
            res.status(404).json(err)
        }
    },
    // @route GET /api/profile/user/:user_id
    // @desc Get profile by user ID
    // @access Public
    getById: async (req, res) => {
        try {
            const { user_id } = req.params; // Destructuring req.params
            const profile = await Profile.findOne({ user: user_id }).populate('user', ['name', 'avatar']);
            res.json(profile);
        } catch (err) {
            res.status(404).json({ profile: 'There is no profile for this user' })
        }
    },
    // @route POST /api/profile/experience
    // @desc Add experience to profile
    // @access Private
    addExperience: async (req, res) => {
        try {
            const { id } = req.user; // Destructuring req.user
            const { errors, isValid } = validate.experienceInput(req.body);
            // Check Validation
            if (!isValid) {
                // Return any errors with 400 status
                return res.status(400).json(errors);
            }
            const profileFound = await Profile.findOne();
            const newExp = { ...req.body };
            profileFound.experience.unshift(newExp);
            const profile = await profileFound.save();
            res.json(profile);
        } catch (err) {
            res.json(err);
        }
    },
    // @route POST /api/profile/education
    // @desc Add education to profile
    // @access Private
    addEducation: async (req, res) => {
        try {
            const { id } = req.user; // Destructuring req.user
            const { errors, isValid } = validate.educationInput(req.body);
            // Check Validation
            if (!isValid) {
                // Return any errors with 400 status
                return res.status(400).json(errors);
            }
            const profileFound = await Profile.findOne({ user: id });
            const newEdu = { ...req.body };
            profileFound.education.unshift(newEdu);
            const profile = await profileFound.save();
            res.json(profile);
        } catch (err) {
            res.json(err);
        }
    },
    // @route DELETE /api/profile/experience/:exp_id
    // @desc Delete experience from profile
    // @access Private
    deleteExp: async (req, res) => {
        try {
            // Destructuring req.user && req.params
            const { id } = req.user;
            const { exp_id } = req.params;
            const profileFound = await Profile.findOne({ user: id });
            const removeIndex = profileFound.experience
                .map(item => item.id)
                .indexOf(exp_id);
            profileFound.experience.splice(removeIndex, 1);
            const profile = await profileFound.save();
            res.json(profile);
        } catch (err) {
            res.status(404).json(err);
        }
    },
    // @route DELETE /api/profile/education/:edu_id
    // @desc Delete education from profile
    // @access Private
    deleteEdu: async (req, res) => {
        try {
            // Destructuring req.user && req.params
            const { id } = req.user;
            const { edu_id } = req.params;
            const profileFound = await Profile.findOne({ user: id });
            const removeIndex = profileFound.education
                .map(item => item.id)
                .indexOf(edu_id);
            // Splice out of array
            profileFound.education.splice(removeIndex, 1);
            const profile = await profileFound.save();
            res.json(profile)
        } catch (err) {
            res.status(404).json(err);
        }
    },
    // @route DELETE /api/profile/
    // @desc Delete user and profile
    // @access Private
    deleteUserandProfile: async (req, res) => {
        try {
            const { id } = req.user;
            await Profile.findOneAndRemove({ user: id });
            await User.findOneAndRemove({ _id: id });
            res.json({ success: true });
        } catch (err) {
            res.json(err);
        }
    },
    // @route GET /api/github
    // @desc GET users github info
    // @access Public if logged in
    getGithubRepos: async (req, res) => {
        try {
            const { username } = req.params;
            const { githubClientId, githubClientSecret } = keys;
            const count = 10;
            const sort = 'created: asc';
            const query = `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
            const data = await axios.get(query);
            res.json({ data: data.data });
        } catch (err) {
            res.json(err)
        }
    }
};

module.exports = ProfileController;