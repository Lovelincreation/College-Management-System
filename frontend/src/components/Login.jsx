import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    if (data.loginid !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col lg:flex-row lg:justify-between lg:items-center">
      {/* Image Section */}
      <img
        className="w-full lg:w-[60%] h-[40vh] lg:h-screen object-cover"
        src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />

      {/* Form Section */}
      <div className="w-full lg:w-[40%] flex justify-center items-start flex-col px-4 lg:pl-8 py-8">
        <p className="text-2xl lg:text-3xl font-semibold pb-2 border-b-2 border-green-500">
          {selected} Login
        </p>
        <form
          className="flex flex-col items-start w-full mt-6 lg:mt-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full lg:w-[70%]">
            <label className="mb-1 text-sm lg:text-base" htmlFor="eno">
              {selected} Login ID
            </label>
            <input
              type="number"
              id="eno"
              required
              className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500"
              {...register("loginid")}
            />
          </div>

          {/* Password Field with Eye Icon */}
          <div className="flex flex-col w-full lg:w-[70%] mt-3 relative">
            <label className="mb-1 text-sm lg:text-base" htmlFor="password">
              Password
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                className="bg-white outline-none border-2 border-gray-400 py-2 px-4 rounded-md w-full focus:border-blue-500 pr-10"
                {...register("password")}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>

          <button className="bg-blue-500 mt-5 text-white px-6 py-2 text-sm lg:text-xl rounded-md hover:bg-blue-700 transition-all flex justify-center items-center">
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
      </div>

      {/* Role Selection Section */}
      <div className="absolute top-4 right-4 flex flex-row gap-2 lg:gap-6">
        {["Student", "Faculty", "Admin"].map((role) => (
          <button
            key={role}
            className={`text-blue-500 text-sm lg:text-base font-semibold hover:text-blue-700 transition-all ${
              selected === role && "border-b-2 border-green-500"
            }`}
            onClick={() => setSelected(role)}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Notification Section */}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
