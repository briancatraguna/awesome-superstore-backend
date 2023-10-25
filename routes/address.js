const express = require('express');
const { param } = require('express-validator');

const addressController = require('../controller/address');

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.get(
    '/regions', 
    isAuthenticated, 
    addressController.getRegions
);

router.get(
    '/countries', 
    isAuthenticated, 
    addressController.getCountries
);

router.get(
    '/states/:countryId',
    isAuthenticated, 
    [
        param('countryId')
            .trim()
            .isInt(),
    ],
    addressController.getStates
);

module.exports = router;
