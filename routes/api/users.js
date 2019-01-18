const router = require('express').Router();
const controller = require('../../controllers/');
const passport = require('passport');

router.route('/register').post(controller.user.findOne);
router.route('/login').post(controller.user.login);
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email })
});
module.exports = router;