const expressAsyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const { sendEmailforOrder } = require("../utils/sendOrderConfirmationEmail");

const paymentCaptured = expressAsyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST,OPTIONS");

  console.log("payment captured route");

  // do a validation
  const secret = process.env.RAZOR_VALIDATION_SECRET;

  // console.log("IN PAYMENT AUTH ", req.body);

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  // console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    // get order_id;
    // find order_id and update payment status to completed.

    const order_id = req.body.payload.payment.entity.order_id;
    // console.log("order id", order_id);
    const order = await Order.findOne({ order_id });
    // console.log("ORDER ", order);
    if (order) {
      order.paymentStatus = "completed";
      order.payment_id = req.body.payload.payment.entity.id;

      const updated_order = await order
        .save()
        .populate("shipping_address", "-_id")
        .populate("products.products", "-_id")
        .populate("user", "-password", "-isAuthenticated", "-auth_id");

      console.log("updated order", updated_order);

      ///make send email call here
      sendEmailforOrder(
        updated_order.user.name,
        updated_order.email,
        updated_order
      );

      res.json({ status: "ok" });
    } else {
      res.status(400);
    }
  } else {
    console.log("request is not legit");
    res.status(502);
  }
});

module.exports = { paymentCaptured };
