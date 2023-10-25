const db = require('../database/database');

class StateAccessor {

    static async getAllByCountry(countryId) {
        const queryStr = 'CALL USP_GetAllStatesByCountry(?)';
        const [result] = await db.query(queryStr, [countryId]);
        return result[0];
    } 
}

module.exports = StateAccessor;