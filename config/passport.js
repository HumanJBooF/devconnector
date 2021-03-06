const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const userController = require('../controllers/').user;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const useJWT = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        userController.getCurrent(jwt_payload, done);
    }))
}

module.exports = useJWT;