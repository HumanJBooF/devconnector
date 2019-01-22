const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = data => {

    const errors = {};
    let { email, password } = data;

    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (!Validator.isEmail(email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(email)) {
        errors.email = 'Email field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;

