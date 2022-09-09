const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const { validateProduct } = require("../utils/validateProduct");

const createOrder = asyncHandler(async (req, res) => {
  const { shipping_address, products, price } = req.body;

  console.log("In Create Order ", shipping_address, products, price);

  for (const p in products) {
    if (validateProduct(p) === false) {
      res.status(400);
      throw new Error("Sorry this order could not be completed. Try Again");
    }
  }

  //price check will go here

  console.log("all products are valid razorpay");
  const payment_capture = 1;
  const amount = price;
  const currency = "INR";

  const options = {
    amount: amount,
    currency,
    receipt: uniqid(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
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

  // // check if the requested order is created by this user only . (No other user fetch order of other users)
  // if (order.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("You cannot perform this action");
  // }

  if (order) {
    res.json(order);
  } // if order dosen't exist throw Error
  else {
    throw new Error("Order not found");
  }
});

module.exports = { createOrder, getOrdersOfUser };
