const uniqid = require("uniqid");

function generateProductId(productName) {
  let p_id = productName.replace(/\s+/g, "_");
  return p_id.concat("_", uniqid());
}

module.exports = generateProductId;
