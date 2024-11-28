import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import Input from "../../../components/Inputs";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function removeSquareBrackets(str) {
    return str.replace(/\[|\]/g, "");
  }
  const onSubmit = async (data) => {
    try {
      const url = API_URL + "/login";
      fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Login failed");
        })
        .then((data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("role", data.role);
          console.log(data.role);

          const receivedRole = data.role;
          const cleanedRole = removeSquareBrackets(receivedRole);

          switch (cleanedRole) {
            case "ADMIN":
              navigate("/accounts");
              break;
            case "CITIZEN":
              navigate("/reports");
              break;
            case "SUPPLIER":
              navigate("/materials");
              break;
            case "CONTRACTOR":
              navigate("/contractors");
              break;
            default:
              navigate("/dashboard");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Failed to Login. Please try again.", {
            autoClose: 3000,
            hideProgressBar: true,
            position: "top-center",
          });
        });
    } catch (e) {
      console.log(e);
      toast.error("An unexpected error occurred.", {
        autoClose: 3000,
        hideProgressBar: true,
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-1/2 max-md:w-[80%]  h-fit  flex flex-col  py-20 px-20 max-md:px-7 gap-5 shadow-sm border-2 border-slate-100 rounded-md ">
      <header>
        <h1 className="font-bold text-whiteTheme-primaryColor text-2xl">
          Login
        </h1>
        <p className="text-sm text-gray-700">
          Access BudgetBuild using your credentials here
        </p>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="application/json"
        className="w-full flex flex-col gap-3"
      >
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <div className="flex flex-col gap-1">
              <label className="text-whiteTheme-textColor font-semibold text-base">
                Username
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                  className={`!border-2 !border-slate-300 !pl-4`}
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-[13px]">
                  {errors.username.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: "Password is required" }}
          render={({ field }) => (
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
          )}
        />
        <Button
          value={<span className="flex items-center">{"Sign In"}</span>}
          className={"!w-full"}
          type="submit"
        />
        <span className="flex items-center gap-2">
          <p className="text-gray-600">Don&apos;t have an account? </p>
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
