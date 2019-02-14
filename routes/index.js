const router = require('express').Router();
const apiRoutes = require('./api');
const path = require('path');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

module.exports = router;