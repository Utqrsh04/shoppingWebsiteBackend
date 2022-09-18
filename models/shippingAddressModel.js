const mongoose = require("mongoose");

const shippingAddressSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },
    street: {
      type: String,
      required: true,
    },
    apartment: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model(
  "ShippingAddress",
  shippingAddressSchema
);

module.exports = ShippingAddress;
