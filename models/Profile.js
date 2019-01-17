const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

});

const Profile = mongoose.model('profiles', ProfileSchema);

module.exports = Profile;