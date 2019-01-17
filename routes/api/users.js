const router = require('express').Router();
const controller = require('../../controllers/');

router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));
router.route('/register').post(controller.user.findOne)

module.exports = router;