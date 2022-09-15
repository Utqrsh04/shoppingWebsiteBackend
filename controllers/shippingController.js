const expressAsyncHandler = require("express-async-handler");
const ShippingAddress = require("../models/shippingAddressModel");

const fetchShippingAddress = expressAsyncHandler(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  console.log("Get Shipping Address Called");

  const user_id = req.params.userId;

  const shippingAddress = await ShippingAddress.findOne({ user: user_id });

  if (shippingAddress) res.json(shippingAddress);
  else
    res.status(404).json({
      message: "Shipping Address not Found",
    });
});

const saveShippingAddress = expressAsyncHandler(async (req, res) => {
  
  console.log("Save Shipping Address Called");

  // Need to complete this func ASAP
  const { state } = req.body;

  if (true) res.json(true);
  else
    res.status(404).json({
      message: "Shipping Address not Found",
    });
});

module.exports = { fetchShippingAddress, saveShippingAddress };
