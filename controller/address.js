const { validationResult } = require('express-validator');

const RegionAccessor = require('../model/region');
const CountryAccessor = require('../model/country');
const StateAccessor = require('../model/state');

exports.getRegions = async (req, res, next) => {
    const regions = await RegionAccessor.getAll();
    return res.status(200).json(regions);
}

exports.getCountries = async (req, res, next) => {
    const countries = await CountryAccessor.getAll();
    return res.status(200).json(countries);
}

exports.getStates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const countryId = req.params.countryId;
    const states = await StateAccessor.getAllByCountry(countryId);
    return res.status(200).json(states);
}