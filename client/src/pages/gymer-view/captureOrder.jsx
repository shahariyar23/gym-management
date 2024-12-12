import { useToast } from "@/hooks/use-toast";
import { fetchToCart } from "@/store/gyn/cartSlice";
import { captureOrder } from "@/store/gyn/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CaptureOrder = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    console.log(orderId, "order id");
    dispatch(captureOrder({ orderId })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Your order successfull done",
        });
        sessionStorage.removeItem("currentOrderId");
        dispatch(fetchToCart({ userId: user?.id }));
        window.location.href = "/gym/account";
      }
    });
  }, [dispatch]);

  return (
    <div>
      <h1>Please wait!!! Order processing...</h1>
    </div>
  );
};

export default CaptureOrder;
