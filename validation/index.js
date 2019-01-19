const validateRegisterInput = require('./register');
const validateLoginInput = require('./login');

module.exports = {
    registerInput: validateRegisterInput,
    loginInput: validateLoginInput
};