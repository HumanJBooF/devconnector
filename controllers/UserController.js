const User = require('../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const UserController = {
    findOne: (req, res) => {
        const { name, email, password } = req.body;
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    return res.status(400).json({ email: `Email already exists` });
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
    }
};

module.exports = UserController;