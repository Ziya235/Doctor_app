import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg p-6 md:p-10 lg:p-20 gap-6 md:gap-10">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 text-center md:text-left">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-snug">
          Connect with Teachers <br /> for Your Learning Journey!
        </p>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-white text-sm font-light">
          <img
            className="w-20 md:w-24 lg:w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p>
            Effortlessly explore our network of trusted teachers{" "}
            <br className="hidden sm:block" />
            and start your learning journey with ease.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
        >
          Find teachers{" "}
          <img className="w-4" src={assets.arrow_icon} alt="Arrow Icon" />
        </a>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center">
        <img
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          src={assets.header_img}
          alt="Header"
        />
      </div>
    </div>
  );
};

export default Header;
