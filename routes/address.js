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
    '/countries/:regionId', 
    isAuthenticated, 
    [
        param('regionId')
            .trim()
            .isInt(),
    ],
    addressController.getCountriesByRegion
);

router.get(
    '/states/:countryId',
    isAuthenticated, 
    [
        param('countryId')
            .trim()
            .isInt(),
    ],
    addressController.getStatesByCountry
);

router.get(
    '/cities/:stateId',
    isAuthenticated,
    [
        param('stateId')
            .trim()
            .isInt(),
    ],
    addressController.getCitiesByState
)

module.exports = router;
