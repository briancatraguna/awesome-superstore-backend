const { validationResult } = require('express-validator');

const RegionAccessor = require('../model/region');
const CountryAccessor = require('../model/country');
const StateAccessor = require('../model/state');
const CityAccessor = require('../model/city');

exports.getRegions = async (req, res, next) => {
    const regions = await RegionAccessor.getAll();
    return res.status(200).json(regions);
}

exports.getCountriesByRegion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const regionId = req.params.regionId;
    const countries = await CountryAccessor.getAllByRegion(regionId);
    return res.status(200).json(countries);
}

exports.getStatesByCountry = async (req, res, next) => {
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

exports.getCitiesByState = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const stateId = req.params.stateId;
    const cities = await CityAccessor.getAllByState(stateId);
    return res.status(200).json(cities);
}