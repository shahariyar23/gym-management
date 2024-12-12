const Cart = require("../../model/Cart.model.js");
const Course = require("../../model/course.model.js");

// Course Enrollment
const addToCart = async (req, res) => {
  const { userId, courseId, quantity } = req.body;
  try {
    if (!userId || !courseId || quantity < 0) {
      return res.status(404).json({
        success: false,
        message: "All field is require",
      });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "course not found",
      });
    }
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const indexOfCurrentCourse = cart.items.findIndex(
      (item) => item.courseId._id.toString() === courseId
    );
    if (indexOfCurrentCourse === -1) {
      cart.items.push({ courseId, quantity });
    } else {
      cart.items[indexOfCurrentCourse].quantity += quantity;
    }
    await cart.save();
    res.status(201).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Some error are happend",
    });
  }
};
//  fetch to cart
const fetchToCart = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.courseId",
      select: "image title price offerPrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const validCartItems = cart.items.filter(
      (courseItem) => courseItem.courseId
    );

    if (validCartItems.length < cart.items.length) {
      cart.items = validCartItems;
      await cart.save();
    }
    const populateCartItem = validCartItems.map((item) => ({
      courseId: item.courseId._id,
      image: item.courseId.image,
      title: item.courseId.title,
      price: item.courseId.price,
      offerPrice: item.courseId.offerPrice,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Some error are happend",
    });
  }
};
// update to cart
const updateToCart = async (req, res) => {
  const { userId, courseId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.courseId._id.toString() === courseId
    );
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found!!",
      });
    }
    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();
    await cart.populate({
      path: "items.courseId",
      select: "image title price offerPrice",
    });
    const populateCartItem = cart.items.map((item) => ({
      courseId: item.courseId ? item.courseId._id : null,
      image: item.courseId ? item.courseId.image : null,
      title: item.courseId ? item.courseId.title : "Product not found",
      price: item.courseId ? item.courseId.price : null,
      offerPrice: item.courseId ? item.courseId.offerPrice : nulll,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Some error are happend",
    });
  }
};
// delete to cart
const deleteToCart = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    if (!userId || !courseId) {
      return res.status(404).json({
        success: false,
        message: "All field is require",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.courseId",
      select: "image title price offerPrice",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "cart not found",
      });
    }
    cart.items = cart.items.filter(
      (item) => item.courseId._id.toString() !== courseId
    );
    await cart.save();
    await cart.populate({
      path: "items.courseId",
      select: "image title price offerPrice",
    });
    const populateCartItem = cart.items.map((item) => ({
      courseId: item.courseId ? item.courseId._id : null,
      image: item.courseId ? item.courseId.image : null,
      title: item.courseId ? item.courseId.title : "Product not found",
      price: item.courseId ? item.courseId.price : null,
      offerPrice: item.courseId ? item.courseId.offerPrice : nulll,
      quantity: item.quantity,
    }));
    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItem,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Some error are happend",
    });
  }
};

module.exports = { addToCart, fetchToCart, updateToCart, deleteToCart };
