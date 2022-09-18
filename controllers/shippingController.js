const expressAsyncHandler = require("express-async-handler");
const ShippingAddress = require("../models/shippingAddressModel");

const fetchShippingAddress = expressAsyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  console.log("Get Shipping Address Called");
  const user = req.user._id;
  const shippingAddress = await ShippingAddress.findOne({ user });

  if (shippingAddress) res.json(shippingAddress);
  else
    res.status(404).json({
      message: "Shipping Address not Found",
    });
});

const saveShippingAddress = expressAsyncHandler(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  console.log("Save Shipping Address Called");

  // Need to complete this func ASAP
  const { user, street, apartment, city, state, postal_code, phone_number } =
    req.body;
  console.log(req.body);

  const savedShippingAddress = await ShippingAddress.findOne({ user });

  if (savedShippingAddress) {
    savedShippingAddress.user = user || savedShippingAddress.user;
    savedShippingAddress.street = street || savedShippingAddress.street;
    savedShippingAddress.apartment =
      apartment || savedShippingAddress.apartment;
    savedShippingAddress.city = city || savedShippingAddress.city;
    savedShippingAddress.state = state || savedShippingAddress.state;
    savedShippingAddress.postal_code =
      postal_code || savedShippingAddress.postal_code;
    savedShippingAddress.phone_number =
      phone_number || savedShippingAddress.phone_number;

    const updatedAddress = await savedShippingAddress.save();

    res.json(updatedAddress);
  } else {
    const shippingAddress = await ShippingAddress.create({
      user,
      street,
      apartment,
      city,
      state,
      postal_code,
      phone_number,
    });

    res.json(shippingAddress);
  }
});

module.exports = { fetchShippingAddress, saveShippingAddress };

// {
//   user: '6325b6a540ce9ddb51ae2303',
//   street: 'Qtr No. H-213',
//   apartment: '',
//   city: 'Sonbhadra',
//   state: 'Uttar Pradesh',
//   postal_code: '231217',
//   phone_number: '+917452943999'
// }
