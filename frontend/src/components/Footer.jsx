import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* -----Left Section ----- */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Müəllim App, şagirdlər və valideynlər üçün müəllimlərlə əlaqə
            qurmağı asanlaşdıran bir platformadır. Bizim məqsədimiz, təhsil
            prosesini daha da səmərəli və rahat etməkdir. Müəllimlərin tapılması
            və onlarla əlaqə qurulması heç vaxt bu qədər asan olmamışdı!
          </p>
        </div>

        {/* -----Center Section ----- */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <Link to="/" onClick={() => scrollTo(0, 0)}>
              Home
            </Link>
            <Link to="/teachers" onClick={() => scrollTo(0, 0)}>
              Teachers
            </Link>
            <Link to="/about" onClick={() => scrollTo(0, 0)}>
              About us
            </Link>
            <Link to="/contact" onClick={() => scrollTo(0, 0)}>
              Contact us
            </Link>
          
          </ul>
        </div>

        {/* -----Right Section ----- */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-324-4354</li>
            <li>nepeskarayel@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ------Copy Right Text------ */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ prescripto All right reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
