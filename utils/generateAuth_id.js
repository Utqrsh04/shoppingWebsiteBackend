const uniqid = require("uniqid");

function generateAuthid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const str = result + uniqid();
  console.log(str);
  return str;
}

module.exports = { generateAuthid };
