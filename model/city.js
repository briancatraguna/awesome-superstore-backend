const db = require('../database/database');

class CityAccessor {

    static async getAllByState(stateId) {
        const queryStr = 'CALL USP_GetAllCitiesByState(?)';
        const [result] = await db.query(queryStr, [stateId]);
        return result[0];
    }
}

module.exports = CityAccessor;