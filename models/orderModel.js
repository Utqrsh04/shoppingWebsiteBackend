const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ShippingAddress",
    },
    payment_id: {
      type: String,
      required: true,
      unique: true,
    },
    // array of products
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
    price: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
