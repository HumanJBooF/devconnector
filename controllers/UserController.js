const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const signToken = require('../config/jwt');
const validateRegisterInput = require('../validation/register')

const UserController = {
    findOne: (req, res) => {
        const { errors, isValid } = validateRegisterInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { name, email, password } = req.body;
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.email = `Email already exist`
                    return res.status(400).json(errors);
                } else {
                    const avatar = gravatar.url(email, { s: '200', r: 'r', default: 'mm' });
                    const newUser = new User({
                        name: name,
                        email: email,
                        avatar,
                        password: password
                    });

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        });
                    });
                };
            });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        // find user by email
        User.findOne({ email })
            .then(user => {
                // check for user
                if (!user) {
                    return res.status(404).json({ email: `User ${email} not found` });
                }

                // check password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            // User Matched
                            // Create JWT Payload
                            const payload = { id: user.id, name: user.name, avatar: user.avatar }
                            // Function from config/jwt
                            signToken(payload, res)
                        } else {
                            res.status(400).json({ password: `Password Incorrect` });
                        }

                    })
            })
    },

    getCurrent: (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch(err => console.log(err));
    }
};

module.exports = UserController;