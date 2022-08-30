const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");

const createOrder = asyncHandler(async (req, res) => {
  const { delivery_address, products, price, user_id } = req.body;

  console.log("In Create Order ", delivery_address, products, price, user_id);

  res.status(201).json({
    message: "order sucessfull",
    order_id: uniqid(),
  });
});

const getOrdersOfUser = asyncHandler(async (req, res) => {
  console.log("Get Orders of User Called");
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  console.log("Get Order By ID Called");
  const oid = req.params.id;
  console.log(oid);
  const order = await Order.findOne({ order_id: oid });

  // check if the requested order is created by this user only . (No other user fetch order of other users)
  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  if (order) {
    res.json(order);
  } // if order dosen't exist throw Error
  else {
    throw new Error("Order not found");
  }
});

module.exports = { createOrder, getOrdersOfUser };