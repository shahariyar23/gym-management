const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
