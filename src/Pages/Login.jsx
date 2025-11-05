import React, { useState } from "react";
import { AUTH_BASR_URL } from "../Services/consfig";
import { useAuth } from "../context/authContext";

import emailIcon from "/email.png";
import eye from "/eye.png";
import loginbanner from "/loginbanner.png";
import google from "/google.png";
import facebook from "/facebook.png";
import apple from "/apple.png";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const {setUserLoggedIn ,setUser} = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

async function handleLogin(e) {
  e.preventDefault();
  setIsSigningIn(true);
  try {
    const result = await axios.post(
      `${AUTH_BASR_URL}/login`,
      {email, password},
      { withCredentials: true}
    )
    if(result.status === 200){
      setUser(result.data.user);
      setUserLoggedIn(true)
      toast.success("Login Success")
      console.log("Login Success", result.data)
      navigate("/");
    }
  } catch (error) {

    if(error.response && error.response.status === 401){
      toast.error("Invalid credentials")
    }else{
      console.log("Login Error",error)
    } 
    }finally{
      setIsSigningIn(false)
  }  
}

  

  return (
    <div className="flex min-h-screen mb-16">
      {/* Left Form Section */}
      <div className="flex flex-col justify-center w-full sm:w-1/2 px-6 sm:px-20 bg-white">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center ">
          Log In
        </h1>

        {errorMessage && (
          <p className="text-red-600 text-sm mb-4">{errorMessage}</p>
        )}

        {/* Email */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Email Address
          </p>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Id"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <img
              src={emailIcon}
              alt="email icon"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <img
              src={eye}
              alt="toggle password"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-4 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 mb-6">
          {/* Remember me */}
          <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleChecked}
              className="cursor-pointer"
            />
            Remember me
          </label>

          {/* Forgot password */}
          <p className="text-red-500 text-sm font-medium cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </div>

        {/* Login Button */}
        <div className="flex item-center justify-center">
          <button
            onClick={handleLogin}
            disabled={isSigningIn}
            className="bg-blue-900 text-white py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition w-full sm:w-[417px]"
          >
            {isSigningIn ? "Logging in..." : "Log In"}
          </button>
        </div>

        {/* OR divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 font-medium">
            OR CONTINUE WITH
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="flex items-center justify-center gap-14 mt-5 mb-20">
          <img src={apple} className="w-[31px] h-[37px]" />
          <img src={facebook} className="w-[31px] h-[37px]" />
          <img
           
            src={google}
            className="w-[31px] h-[37px] cursor-pointer"
          />
        </div>

        {/* Footer */}
        <p className="mt-6 text-gray-600 text-xl text-center font-bold">
          Don't have an account?{" "}
          <NavLink
            className="text-blue-700 font-bold cursor-pointer hover:underline text-xl"
            to="/signup"
          >
            Create One
          </NavLink>
        </p>
      </div>

      {/* Right Image Section (hidden on small screens) */}
      <div className="hidden sm:block w-1/2">
        <img
          src={loginbanner}
          alt="login banner"
          className="w-full h-full object-cover rounded-tl-2xl rounded-bl-2xl"
        />
      </div>
    </div>
  );
}

export default Login;
