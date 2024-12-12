import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminCouserSlice from "./admin/courseSlice";
import adminOrderSlice from "./admin/orderSlice";

import gymCourseSlice from "./gyn/courseSlice";
import gymCartSlice from "./gyn/cartSlice";
import gymAddressSlice from "./gyn/addressSlice";
import gymOrderSlice from "./gyn/orderSlice";
import gymSearchSlice from "./gyn/searchSlice";
import gymSliceSlice from "./gyn/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminCourse: adminCouserSlice,
    adminOrder: adminOrderSlice,

    gymCourse: gymCourseSlice,
    gymCart: gymCartSlice,
    gymAddress: gymAddressSlice,
    gymOrder: gymOrderSlice,
    gymSearch: gymSearchSlice,
    gymReview: gymSliceSlice,
  },
});

export default store;
