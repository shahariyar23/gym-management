const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const authRoute = require("./routes/auth/authRoute.js");
const adminCourseRoute = require("./routes/admin/courseRoute.js");
const adminOrderList = require("./routes/admin/orderRoute.js");

const gymCourseRoute = require("./routes/gym/courseRoute.js");
const gymCartRoute = require("./routes/gym/cartRoute.js");
const gymAddressRoute = require("./routes/gym/addressRoute.js");
const gymOrderRoute = require("./routes/gym/orderRoute.js");
const gymReviewRoute = require("./routes/gym/reviewRoute.js");
const gymSearchRoute = require("./routes/gym/searchRoute.js");

mongoose
  .connect(process.env.REACT_APP_MONGODB_URI)
  .then((res) => console.log("mongodb connected: "))
  .catch((e) => console.log(e));

const app = express();
const PORT = process.env.REACT_APP_PORT || 5000;

app.use(
  cors({
    origin: process.env.REACT_APP_CLIND_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/admin/course", adminCourseRoute);
app.use("/api/admin/order/", adminOrderList);

app.use("/api/gym/course", gymCourseRoute);
app.use("/api/gym/cart", gymCartRoute);
app.use("/api/gym/address", gymAddressRoute);
app.use("/api/gym/order", gymOrderRoute);
app.use("/api/gym/review", gymReviewRoute);
app.use("/api/search", gymSearchRoute);

app.listen(PORT, () => console.log(`Server is running ${PORT}`));
