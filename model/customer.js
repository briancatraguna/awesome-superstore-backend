const db = require('../database/database');

class CustomerAccessor {

  static async insert(name, segment, email, password) {
    const queryStr = 'CALL USP_UpsertCustomer(?,?,?,?)';
    const [result] = await db.query(queryStr, [
      name,
      segment,
      email,
      password
    ]);
    return result[0][0].cust_id;
  }

  static async findOneById(customerId) {
    const [result] = await db.execute('CALL USP_GetCustomerById(?)',[customerId]);
    if (result[0].length == 0) return null;
    return result[0][0];
  }

  static async findOneByEmail(email) {
    const [result] = await db.execute('CALL USP_GetCustomerByEmail(?)',[email]);
    if (result[0].length == 0) return null;
    return result[0][0];
  }

}

module.exports = CustomerAccessor;
