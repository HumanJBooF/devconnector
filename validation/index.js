const validateRegisterInput = require('./register.validate');
const validateLoginInput = require('./login.validate');
const validateProfileInput = require('./profile.validate');
const validateExperienceInput = require('./experience.validate');
const validateEducationInput = require('./education.validate');
const validatePostInput = require('./post.validate')

module.exports = {
    registerInput: validateRegisterInput,
    loginInput: validateLoginInput,
    profileInput: validateProfileInput,
    experienceInput: validateExperienceInput,
    educationInput: validateEducationInput,
    postInput: validatePostInput
};