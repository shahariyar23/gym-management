const express = require("express");
const {
  addToCart,
  fetchToCart,
  updateToCart,
  deleteToCart,
} = require("../../controller/gym/cart.controller.js");

const route = express.Router();

route.post("/add", addToCart);
route.get("/fetch/:userId", fetchToCart);
route.put("/update", updateToCart);
route.delete("/delete/:userId/:courseId", deleteToCart);

module.exports = route;
