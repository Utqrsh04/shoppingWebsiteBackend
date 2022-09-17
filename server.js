const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const shippingAddressRoutes = require("./routes/shippingRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
var cors = require("cors");
const expressAsyncHandler = require("express-async-handler");
const User = require("./models/userModel");
app.use(cors());

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is runnnig");
});
app.get(
  "/api/verify/:id",
  expressAsyncHandler(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    const id = req.params.id;
    // console.log("catched ", id);
    // utkarshxdd@gmail.com&oMrvdIdJBdj9vyR3mbgfgl80g0pgg
    const info = req.params.id.split("&");
    const email = info[0];
    const auth_id = info[1];
    const userExists = await User.findOne({ email });

    if (userExists) {
      if (userExists.auth_id === auth_id) {
        userExists.isAuthenticated = true;
        await userExists.save();
        res.send("You are sucessfully verified");
      } else {
        res.send("Verification Failed");
      }
    }
  })
);

app.use("/api/users", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/product", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/shippingAddress", shippingAddressRoutes);

// --------------------deployment---------------------
// __dirname = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/frontend/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is runnnig");
//   });
// }

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
