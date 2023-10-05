const db = require('../database/database');

class CustomerAccessor {

  static async upsert(name, segment, email, password) {
    const queryStr = 'CALL USP_UpsertCustomer(?,?,?,?)';
    const result = await db.query(queryStr, [
      name,
      segment,
      email,
      password
    ]);
    console.log(result);
    return result;
  }

  static findOneById(customerId) {
    if (customer.length === 0) return;
    return db.execute('CALL USP_GetCustomerById(?)',[customerId]);
  }

  static findOneByEmail(email) {
    if (email.length === 0) return;
    return db.execute('CALL USP_GetCustomerByEmail(?)',[email])
  }

}

module.exports = CustomerAccessor;
