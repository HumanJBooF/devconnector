const UserController = require('./UserController');
const PostController = require('./PostController');
const ProfileController = require('./ProfileController');

module.exports = {
    user: UserController,
    post: PostController,
    profile: ProfileController
};