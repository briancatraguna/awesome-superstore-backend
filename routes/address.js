const express = require('express');
const addressController = require('../controller/address');

const router = express.Router();

router.get('/regions', addressController.getRegions);

module.exports = router;
