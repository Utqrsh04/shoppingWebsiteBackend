const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ShippingAddress",
    },
    payment_id: {
      type: String,
    },
    // array of products
    products: [
      {
        qty: {
          type: Number,
          default: 0,
        },
        selectedSize: {
          type: String,
        },
        products: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    subTotal: {
      type: String,
      required: true,
    },
    tax: {
      type: String,
      required: true,
    },
    delivery: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    totalItems: {
      type: Number,
      required: true,
      default: 1,
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
