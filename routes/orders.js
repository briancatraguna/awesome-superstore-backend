const express = require("express");
const { param, body } = require("express-validator");

const orderController = require("../controller/orders");

const router = express.Router();

const isAuthenticated = require("../middleware/is-auth");

router.post("/", isAuthenticated, orderController.insertOrders);

module.exports = router;
