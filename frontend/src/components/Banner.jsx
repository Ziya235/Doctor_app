import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Banner = () => {
  const navigate = useNavigate("");

  const token = Cookies.get("token");

  return (
    <div className="flex bg-primary rounded-lg px-6 sm:px-10 md: px-14 lg:px-12 my-20 md:mx-10">
      {/* ----  Left Side-------- */}

      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Connect with 100+ Teachers </p>
          <p className="mt-4">for Your Learning Needs.</p>
        </div>
        {!token ? (
          <button
            onClick={() => {
              navigate("/register");
              scrollTo(0, 0);
            }}
            className="bg-white text-sm sm:text-basr text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          >
            Create account
          </button>
        ) :(
          <button
          onClick={() => {
            navigate("/teachers");
            scrollTo(0, 0);
          }}
          className="bg-white text-sm sm:text-basr text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Find Teachers
        </button>
        )}
      </div>

      {/* ----  Right Side-------- */}
      <div className="hidden md:flex md:items-center md:justify-center md:w-1/2 lg:w-[370px] relative">
        <img
          className="w-full max-w-md rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
