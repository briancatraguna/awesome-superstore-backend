const { validationResult } = require("express-validator");

const OrdersAccessor = require("../model/orders");

exports.insertOrders = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }
  const orderProductJSON = req.body.order;
  const in_addr_id = req.body.addr_id;
  const in_cust_id = req.body.cust_id;
  const in_ship_mode = req.body.ship_mode;
  const in_ship_date = new Date(req.body.ship_date)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  console.log(in_ship_date);

  const result = await OrdersAccessor.insertOrderDetails(
    JSON.stringify(orderProductJSON),
    in_addr_id,
    in_cust_id,
    in_ship_mode,
    in_ship_date
  );
  return res.status(200).json({ message: "Succesfully placed orders " });
};
