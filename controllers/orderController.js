const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const Razorpay = require("razorpay");
const Product = require("../models/productModel");
const ShippingAddress = require("../models/shippingAddressModel");
const { getOrderProducts } = require("../utils/createOrderProductsObject");

const razorpay = new Razorpay({
  // key_id: process.env.RAZOR_KEY,
  // key_secret: process.env.SECRET,

  key_id: "rzp_test_qGx6ZOHwjb87fm",
  key_secret: "TGtc2CERGLrGO9wNilbufFaO",
});

const createOrder = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  console.log("In Create Order ");
  const { products, price, email, shippingData } = req.body;

  const Allproducts = await Product.find();

  let subtotal = 0;
  let totalItems = 0;

  //subtotal calculation and check
  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < Allproducts.length; j++) {
      if (
        products[i].product_id.localeCompare(Allproducts[j].product_id) == 0
      ) {
        // console.log(
        //   "matched ✔ ",
        //   products[i].product_id,
        //   Allproducts[j].product_id
        // );
        subtotal += Allproducts[j].price * products[i].qty;
        totalItems += products[i].qty;
      }
    }
  }
  let tax = 20;
  let delivery = 49;
  if (subtotal > 799) delivery = 0;

  const totalPrice = subtotal + tax + delivery;

  console.log("total ", totalPrice);

  console.log("all products are valid razorpay");
  const payment_capture = 1;
  const amount = 2 * 100;
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
    console.log("Frontend ", shippingData);
    const user = shippingData.user;

    let savedShippingAddress = await ShippingAddress.findOne({ user });
    console.log("DB ", savedShippingAddress);

    let updatedAddress;

    if (savedShippingAddress) {
      savedShippingAddress.user = shippingData.user;
      savedShippingAddress.street = shippingData.street;
      savedShippingAddress.apartment = shippingData.apartment;
      savedShippingAddress.city = shippingData.city;
      savedShippingAddress.state = shippingData.state;
      savedShippingAddress.postal_code = shippingData.postal_code;
      savedShippingAddress.phone_number = shippingData.phone_number;

      updatedAddress = await savedShippingAddress.save();
    } else {
      updatedAddress = await ShippingAddress.create(shippingData);
    }

    console.log("Updated ", updatedAddress);

    //create new order with following details
    const newOrder = {
      order_id: response.id,
      email: email,
      shipping_address: updatedAddress._id,
      products: getOrderProducts(products),
      subTotal: subtotal,
      tax: tax,
      delivery: delivery,
      totalItems: totalItems,
      totalPrice: totalPrice,
      user: req.user,
    };

    const createdOrder = await Order.create(newOrder);
    console.log("created order ", createdOrder);

    createdOrder.user.auth_id = undefined;
    createdOrder.user.isAuthenticated = undefined;

    if (createdOrder) {
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        order: createdOrder,
      });
    } else {
      res.status(400);
      throw new Error("Error Occured");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.error);
  }
});

const getOrdersOfUser = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  console.log("Get Orders of User Called");
  const orders = await Order.find({ user: req.user._id }).populate("products");
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  console.log("Get Order By ID Called");
  const oid = req.params.id;
  console.log(oid);
  const order = await Order.findOne({ order_id: oid })
    .populate("shipping_address", "-_id")
    .populate("products.products", "-_id");

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

module.exports = { createOrder, getOrdersOfUser, getOrderById };
