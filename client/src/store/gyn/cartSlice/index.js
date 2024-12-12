import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ userId, courseId, quantity }) => {
    console.log(userId, courseId, quantity, "cart data");
    const res = await axios.post("http://localhost:5000/api/gym/cart/add", {
      userId,
      courseId,
      quantity,
    });
    return res?.data;
  }
);
export const fetchToCart = createAsyncThunk(
  "/cart/fetchToCart",
  async ({ userId }) => {
    const res = await axios.get(
      `http://localhost:5000/api/gym/cart/fetch/${userId}`,
      {}
    );
    return res?.data;
  }
);
export const updateToCart = createAsyncThunk(
  "/cart/updateToCart",
  async ({ userId, courseId, quantity }) => {
    const res = await axios.put("http://localhost:5000/api/gym/cart/update", {
      userId,
      courseId,
      quantity,
    });
    return res?.data;
  }
);
export const deleteToCart = createAsyncThunk(
  "/cart/deleteToCart",
  async ({ userId, courseId }) => {
    const res = await axios.delete(
      `http://localhost:5000/api/gym/cart/delete/${userId}/${courseId}`,
      {}
    );
    return res?.data;
  }
);
const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cart;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateToCart.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteToCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shoppingCartSlice.reducer;
