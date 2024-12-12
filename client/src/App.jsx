import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-vew/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import GymLayOut from "./components/gymer-view/layout";
import NotFound from "./pages/notfound";
import GymHome from "./pages/gymer-view/home";
import GymAccount from "./pages/gymer-view/account";
import GymCheckOut from "./pages/gymer-view/checkout";
import GymListing from "./pages/gymer-view/listing";
import CheckAuth from "./components/common/check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "./components/ui/skeleton";
import AdminGymCourse from "./pages/admin-view/gym";
import PaymentFail from "./pages/gymer-view/paymentFail";
import CaptureOrder from "./pages/gymer-view/captureOrder";
import OrderSuccess from "./pages/gymer-view/orderSuccess";
import SearchResult from "./pages/gymer-view/search";
import Accessories from "./pages/gymer-view/accessories";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) {
    return (
      <Skeleton className="flex items-center justify-center w-full bg-black h-full" />
    );
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common pages */}
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="product" element={<AdminFeatures />} />
          <Route path="course" element={<AdminGymCourse />} />
        </Route>

        <Route path="/" element={<GymLayOut />}>
          <Route path="/gym/dashboard" element={<GymHome />} />
          <Route path="/gym/listing" element={<GymListing />} />
          <Route path="/gym/accessories" element={<Accessories />} />
          <Route path="/gym/search" element={<SearchResult />} />
        </Route>

        <Route path="/gym" element={<GymLayOut />}>
          <Route path="/gym/dashboard" element={<GymHome />} />
          <Route path="/gym/listing" element={<GymListing />} />
          <Route path="/gym/accessories" element={<Accessories />} />
          <Route path="/gym/search" element={<SearchResult />} />
        </Route>

        <Route
          path="/gym"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <GymLayOut />
            </CheckAuth>
          }
        >
          <Route path="checkout" element={<GymCheckOut />} />
          <Route path="account" element={<GymAccount />} />
          <Route path="payment/success/:trnID" element={<CaptureOrder />} />
          <Route path="payment/fail/:trnID" element={<PaymentFail />} />
          {/* <Route path="payment/cancel" element={<PaymentCancel />} /> */}
          <Route path="order/success" element={<OrderSuccess />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
