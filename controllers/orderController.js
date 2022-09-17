const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const Razorpay = require("razorpay");
const Product = require("../models/productModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.SECRET,
});

const createOrder = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const { products, price, email, shippingData } = req.body;

  // console.log("In Create Order ", req.body);

  const Allproducts = await Product.find();

  let totalPrice = 0;

  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < Allproducts.length; j++) {
      console.log(
        "matching ",
        products[i].product_id,
        Allproducts[j].product_id
      );

      if (
        products[i].product_id.localeCompare(Allproducts[j].product_id) == 0
      ) {
        console.log(
          "matched ✔ ",
          products[i].product_id,
          Allproducts[j].product_id
        );
        totalPrice += Allproducts[j].price * products[i].qty;
      }
    }
  }

  console.log("total ", totalPrice);

  console.log("all products are valid razorpay");
  const payment_capture = 1;
  const amount = totalPrice * 100;
  const currency = "INR";

  const options = {
    amount: amount,
    currency,
    receipt: uniqid(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log("razorpay order ", response);

    //save shipping address and get its _id

    //create new order with following details

    const newOrder = {
      order_id: "",
      shipping_address: "ref of shipping address",
      payment_id: "",
      products: products,
      price: totalPrice,
      user: req.user,
    };

    const createdOrder = await Order.create(newOrder);

    if (createOrder) {
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        order: createOrder,
      });
    } else {
      res.status(400);
      throw new Error("Error Occured");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.error.description);
  }
});

const getOrdersOfUser = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  console.log("Get Orders of User Called");
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

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
