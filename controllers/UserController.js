const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const signToken = require('../config/jwt'); // Load keys
const validate = require('../validation/'); // Load validation

const UserController = {
    // @route   POST api/users/register
    // @desc    Register user
    // @access  Public
    findOne: async (req, res) => {
        try {
            const { errors, isValid } = validate.registerInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const { name, email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                errors.email = `Email already exist`
                return res.status(400).json(errors);
            } else {
                const avatar = gravatar.url(email, { s: '200', r: 'r', default: 'mm' }); // Size, Rating, Default
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
                        newUser.save().then(user => res.json(user))
                    });
                });
            }
        } catch (err) {
            res.json(err);
        }
    },
    // @route   GET api/users/login
    // @desc    Login User / Returning JWT Token
    // @access  Public
    login: async (req, res) => {
        try {
            const { errors, isValid } = validate.loginInput(req.body);

            // Check Validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const { email, password } = req.body;
            // Find user by email
            const user = await User.findOne({ email });
            if (!user) {
                errors.email = `User ${email} not found`;
                return res.status(404).json(errors);
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                // User Matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }
                // Function from config/jwt
                signToken(payload, res)
            } else {
                errors.password = 'Incorrect user/password combination';
                res.status(400).json(errors);
            }
        } catch (err) {
            console.log(err);
        }
    },
    // @route   GET api/users/current
    // @desc    Return current user
    // @access  Private
    current: (req, res) => {
        const { id, name, email } = req.user;
        res.json({ id: id, name: name, email: email });
    },
    // Get current user
    getCurrent: async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports = UserController;