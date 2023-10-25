const RegionAccessor = require('../model/region');
const CountryAccessor = require('../model/country');

exports.getRegions = async (req, res, next) => {
    const regions = await RegionAccessor.getAll();
    return res.status(200).json(regions);
}

exports.getCountries = async (req, res, next) => {
    const countries = await CountryAccessor.getAll();
    return res.status(200).json(countries);
}