const Profile = require('../models/Profile');
const User = require('../models/User');


const ProfileController = {
    // @desc Get current users profile
    // @access Private
    // findOne: (req, res) => {
    //     const { id, name, email } = req.user;
    //     Profile.findOne({ user: id })
    //         .then(profile => {
    //             if (!profile) {
    //                 return res.status(404).json()
    //             }
    //         })
    // }
};

module.exports = ProfileController;