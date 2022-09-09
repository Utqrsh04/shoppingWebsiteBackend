import Product from "../models/productModel";

const expressAsyncHandler = require("express-async-handler");

export const validateProduct = expressAsyncHandler(async (p) => {
  console.log("validating product");

  const product = await Product.findOne({ product_id: pid });

  if (!product) return false;

  if (p.price === product.price) return true;
  else return false;
});
