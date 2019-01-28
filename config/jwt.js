const jwt = require('jsonwebtoken');
const keys = require('./keys');

const signToken = (payload, res) => {
    // Sign Token
    return jwt.sign(payload, keys.secretOrKey, {
        expiresIn: (3600 * 24),
    }, (err, token) => res.json({ success: true, token: `Bearer ${token}` }));
}

module.exports = signToken