const db = require("../database/database");

class OrdersAccessor {
  static async insertOrderDetails(
    orderProductJSON,
    in_addr_id,
    in_cust_id,
    in_ship_mode,
    in_ship_date
  ) {
    const queryStr = "CALL USP_InsertOrdersData(?,?,?,?,?);";
    const [result] = await db.execute(queryStr, [
      orderProductJSON,
      in_addr_id,
      in_cust_id,
      in_ship_mode,
      in_ship_date,
    ]);
    console.log(result);
    return result;
  }
}

module.exports = OrdersAccessor;
