const db = require('../database/database');

class Customer {
  constructor(id, name, segment, email, password) {
    this.id = id;
    this.name = name;
    this.segment = segment;
    this.email = email;
    this.password = password;
  }

  save(
      name,
      segment,
      email,
      password,
  ) {
    const queryStr = 'CALL USP_UpsertCustomer(?,?,?,?)';
  }
}
