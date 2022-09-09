const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const generateProductId = require("../utils/generateProductId");

// func to fetch all products
const getProducts = expressAsyncHandler(async (req, res) => {
  console.log("Get Products Called");
  const products = await Product.find();
  res.json(products);
});

const getNewArrivalsProducts = expressAsyncHandler(async (req, res) => {
  console.log("Get New Arrivals Products Called");
  const products = await Product.find({ new_arrivals: true });
  res.json(products);
});

// func to create product
const createProduct = expressAsyncHandler(async (req, res) => {
  console.log("Create Product Called");
  const {
    product_name,
    desc,
    price,
    cover_image,
    images,
    new_arrivals,
    size_options,
  } = req.body;

  const product_id = generateProductId(product_name);

  // if any field is not provided throw error
  if (!product_name || !product_id || !price || !cover_image) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  // else create a new product with provided fields
  else {
    const product = new Product({
      product_name,
      product_id,
      new_arrivals,
      desc,
      price,
      cover_image,
      images,
      size_options,
    });

    const createProduct = await product.save();
    res.status(201).json(createProduct);
  }
});

// func to get single product by id
const getProductById = expressAsyncHandler(async (req, res) => {
  console.log("Get Products by Id called");
  const pid = req.params.id;

  const product = await Product.findOne({ product_id: pid });

  if (product) res.json(product);
  else
    res.status(404).json({
      message: "Product not Found",
    });
});

// func to update a product
const updateProduct = expressAsyncHandler(async (req, res) => {
  console.log("Update Product Called");
  const id = req.params.id;
  const {
    product_name,
    product_id,
    desc,
    price,
    cover_image,
    images,
    size_options,
  } = req.body;

  const product = await Product.findById(id);

  // check if product exist and perform the updation
  if (product) {
    product.product_id = product_id;
    product.product_name = product_name;
    product.desc = desc;
    product.price = price;
    product.cover_image = cover_image;
    product.images = images;
    product.size_options = size_options;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  }
  // if product dosen't exist throw Error
  else {
    throw new Error("Product not found");
  }
});

// func to delete product
const deleteProduct = expressAsyncHandler(async (req, res) => {
  // console.log("Delete Product Called");
  const p_id = req.params.id;

  const product = await Product.findById(p_id);

  // removing the product if it exists
  if (product) {
    await product.remove();
    res.json({
      message: "Product Deleted",
    });
  }
  // if product dosen't exist throw Error
  else {
    throw new Error("Product not found");
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getNewArrivalsProducts,
};
