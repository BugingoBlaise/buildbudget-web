import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState, useEffect } from "react";
import Input from "../../../components/Inputs";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-1/2 max-md:w-[80%]  h-fit  flex flex-col  py-20 px-20 max-md:px-7 gap-5 shadow-sm border-2 border-slate-100 rounded-md ">
      <header>
        <h1 className="font-bold text-whiteTheme-primaryColor text-2xl">
          Login
        </h1>
        <p className="text-sm text-gray-700">
          Access BudgetBuild using your crediantials here
        </p>
      </header>
      <form
        action=""
        // onSubmit={
        //
        // }
        className="w-full flex flex-col gap-3"
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: "Email is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Email
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your email Address"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-[13px]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-1">
                <label className="text-whiteTheme-textColor font-semibold text-base">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...field}
                    className={`!border-2 !border-slate-300 !pl-4`}
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <LuEye size={18} className="" />
                    ) : (
                      <LuEyeOff size={18} className="" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-[13px]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            );
          }}
        />
        <Button
          value={<span className="flex items-center">{"Sign In"}</span>}
          className={"!w-full"}
          onClick={() => navigate("/dashboard")}
        />
        <span className="flex items-center gap-2">
          <p className="text-gray-600">Don’t have an account? </p>
          <p
            className="text-whiteTheme-primaryColor font-bold cursor-pointer"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </p>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
