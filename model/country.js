const db = require('../database/database');

class CountryAccessor {

    static async getAll() {
        const queryStr = 'CALL USP_GetAllCountries()';
        const [result] = await db.query(queryStr);
        return result[0];
    }
}

module.exports = CountryAccessor;