import CommonFrom from "@/components/common/from";
import { loginFromControls } from "@/config";
import { toast, useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AuthLogin = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const initialstate = {
    userName: "",
    email: "",
    password: "",
    avatar: "",
  };

  const [fromData, setFromData] = useState(initialstate);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(fromData)).then((res) => {
      if (res?.payload?.success) {
        toast({
          title: `${res?.payload?.message}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: `${res?.payload?.message}`,
        });
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Login your account
        </h1>
      </div>
      <CommonFrom
        fromControls={loginFromControls}
        fromData={fromData}
        setFromData={setFromData}
        buttonText={"Login"}
        onSubmit={onSubmit}
      />
      <p className="text-md text-foreground">
        Create an account?{" "}
        <Link
          to="/auth/register"
          className="text-blue-700 hover:underline font-semibold cursor-pointer"
        >
          register
        </Link>
      </p>
    </div>
  );
};

export default AuthLogin;
