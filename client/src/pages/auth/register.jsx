import CommonFrom from "@/components/common/from";
import { registerFromControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { Variable } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AuthRegister = () => {
  const initialstate = {
    userName: "",
    email: "",
    password: "",
    avatar: "",
  };

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fromData, setFromData] = useState(initialstate);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(fromData)).then((res) => {
      if (res.payload?.success) {
        toast({
          title: `${res.payload?.message}`,
        });
        navigate("/auth/login");
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
          Create an account
        </h1>
      </div>
      <CommonFrom
        fromControls={registerFromControls}
        fromData={fromData}
        setFromData={setFromData}
        buttonText={"Create an account"}
        onSubmit={onSubmit}
      />
      <p className="text-md text-foreground">
        Have an account?{" "}
        <Link
          to="/auth/login"
          className="text-blue-700 hover:underline font-semibold cursor-pointer"
        >
          login
        </Link>
      </p>
    </div>
  );
};

export default AuthRegister;
