const express = require("express");
const {
  getAllOrderByUser,
  getOrderDetails,
  createOrder,
  paymentSuccess,
  paymentFail,
  capturePayment,
} = require("../../controller/gym/order.controller.js");

const router = express.Router();

router.get("/list/:userId", getAllOrderByUser);
router.get("/details/:id", getOrderDetails);
router.post("/payment", createOrder);
router.post("/payment/success/:trnID", paymentSuccess);
router.post("/payment/fail/:trnID", paymentFail);
router.post("/captureOrder", capturePayment);

module.exports = router;
