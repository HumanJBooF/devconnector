const validateRegisterInput = require('./register');
const validateLoginInput = require('./login');
const validateProfileInput = require('./profile');
const validateExperienceInput = require('./experience');
const validateEducationInput = require('./education');

module.exports = {
    registerInput: validateRegisterInput,
    loginInput: validateLoginInput,
    profileInput: validateProfileInput,
    experienceInput: validateExperienceInput,
    educationInput: validateEducationInput
};