const express = require('express');
const router = express.Router();

router.use('/medicines', require('./medicines'));
router.use('/ailments', require('./ailments'));

module.exports = router;