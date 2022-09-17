const expressAsyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Order = require("../models/orderModel");

const paymentCaptured = expressAsyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST,OPTIONS");

  console.log("payment captured route");

  // do a validation
  const secret = "utqrsh@1234";

  console.log(req.body);

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    // get order_id;
    // find order_id and update payment status to completed.

    const order_id = "";

    const order = await Order.findOne({ order_id });

    if (order) {
      order.paymentStatus = "completed";

      await Order.Save();

      require("fs").writeFileSync(
        "payment1.json",
        JSON.stringify(req.body, null, 4)
      );
    } else {
      // pass it
      console.log("request is not legit");
    }
    res.json({ status: "ok" });
  }
});

module.exports = { paymentCaptured };
