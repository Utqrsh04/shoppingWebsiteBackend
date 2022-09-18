function getOrderProducts(products) {
  const productsArr = [];

  for (let i = 0; i < products.length; i++) {
    const temp = {
      qty: products[i].qty,
      selectedSize: products[i].selectedSize,
      products: products[i]._id,
    };

    productsArr.push(temp);
  }

  return productsArr;
}

module.exports = { getOrderProducts };
