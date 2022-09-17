const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_id: {
      type: String,
      required: true,
      unique: true,
    },
    new_arrivals: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    cover_image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    keywords: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    size_options: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
