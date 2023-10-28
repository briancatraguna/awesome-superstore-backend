const express = require('express');
const { param, body } = require('express-validator');

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

router.put(
    '/',
    isAuthenticated,
    [
        body('cityId')
            .trim()
            .isInt(),
        body('postalCode')
            .trim()
            .isLength({max: 10}),
        body('custId')
            .trim()
            .isLength({max:20})
    ],
    addressController.putAddress
)

router.get(
    '/:custId',
    isAuthenticated,
    [
        param('custId')
            .trim()
            .isInt()
    ],
    addressController.getAddressByCustomer
)

router.post(
    '/',
    isAuthenticated,
    [
        body('addressId')
            .trim()
            .isInt(),
        body('cityId')
            .trim()
            .isInt(),
        body('postalCode')
            .trim()
            .isLength({max: 10})
    ],
    addressController.postAddress
)

module.exports = router;
