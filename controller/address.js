const RegionAccessor = require('../model/region');

exports.getRegions = async (req, res, next) => {
    const regions = await RegionAccessor.getAll();
    return res.status(200).json(regions);
}