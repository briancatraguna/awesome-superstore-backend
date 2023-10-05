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
    if (customer.length === 0) return;
    return await db.execute('CALL USP_GetCustomerById(?)',[customerId]);
  }

  static async findOneByEmail(email) {
    if (email.length === 0) return;
    return await db.execute('CALL USP_GetCustomerByEmail(?)',[email])
  }

}

module.exports = CustomerAccessor;
