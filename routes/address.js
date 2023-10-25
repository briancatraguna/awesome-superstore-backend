const express = require('express');
const addressController = require('../controller/address');

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.get('/regions', isAuthenticated, addressController.getRegions);

router.get('/countries', isAuthenticated, addressController.getCountries);

module.exports = router;
