const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateEducationInput = data => {

    const errors = {};
    let { school, degree, studied, from } = data;

    school = !isEmpty(school) ? school : '';
    degree = !isEmpty(degree) ? degree : '';
    studied = !isEmpty(studied) ? studied : '';
    from = !isEmpty(from) ? from : '';

    if (Validator.isEmpty(school)) {
        errors.school = 'School field is required';
    }

    if (Validator.isEmpty(degree)) {
        errors.degree = 'Degree field is required';
    }

    if (Validator.isEmpty(studied)) {
        errors.studied = 'Field of study is required';
    }

    if (Validator.isEmpty(from)) {
        errors.from = 'From date field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateEducationInput;

