const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const ProductAccessor = require("../model/product");

exports.findAllProducts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation error",
      errors: errors.array(),
    });
  }

  try {
    const allProducts = await ProductAccessor.findAllProducts();
    res.status(200).json({
      products: allProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: "Error",
      errors: e,
    });
  } finally {
    next();
  }
};
