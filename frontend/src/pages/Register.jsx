import React, { useState } from "react";
import { FaArrowRight, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { PiUserListFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const [isFocused4, setIsFocused4] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocus2 = () => setIsFocused2(true);
  const handleBlur2 = () => setIsFocused2(false);
  const handleFocus3 = () => setIsFocused3(true);
  const handleBlur3 = () => setIsFocused3(false);
  const handleFocus4 = () => setIsFocused4(true);
  const handleBlur4 = () => setIsFocused4(false);

  const navigate= useNavigate()
  const validateForm = () => {
    let formErrors = {};
    if (!name) {
      formErrors.name = "Adınızı yazın";
    }
    if (!surname) {
      formErrors.surname = "Soyadınızı yazın";
    }
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!password) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log(speciality);
    

    fetch("http://localhost:5000/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, surname,speciality, email, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Email or password is wrong");
        return response.text();
      })
      .then((token) => {
        Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
        navigate("/")

      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div className="bg-white shadow-md w-4/5 lg:w-1/2 mx-auto pb-8">
      <div className="flex justify-start  border-blue-500">
        <p className="py-4 px-16 text-gray-500 cursor-pointer">
          <Link to="/login" className="hover:text-black">
            Daxil ol
          </Link>
        </p>
        <p className="py-4 px-16 text-blue-500 text-base border-b-2 border-blue-500 cursor-pointer hover:text-black">
          Qeydiyyat
        </p>
      </div>

      <div className="flex flex-col items-center mt-8 space-y-2">
        <h1
          className="font-bold text-lg lg:text-2xl"
          style={{ fontSize: "26px" }}
        >
          Gəlin hesab açaq!
        </h1>
      </div>

      <div className="w-4/5 lg:w-3/5 mx-auto mt-6">
        <form onSubmit={handleSubmit}>
          <div className=" relative">
            <div
              className={`absolute inset-y-0 left-0 w-10 h-full flex items-center justify-center bg-gray-200 rounded ${
                isFocused ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <FaUser />
            </div>
            <input
              type="text"
              name="text"
              placeholder="Adınızı daxil edin"
              className="pl-12 pr-4 py-3 w-full border rounded focus:ring focus:ring-blue-500 focus:outline-none"
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <div className="mt-6 relative">
            <div
              className={`absolute inset-y-0 left-0 w-10 h-full flex items-center justify-center bg-gray-200 rounded ${
                isFocused2 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <PiUserListFill size={23} />
            </div>
            <input
              type="text"
              name="text"
              placeholder="Soyadınızı daxil edin"
              className="pl-12 pr-4 py-3 w-full border rounded focus:ring focus:ring-blue-500 focus:outline-none"
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
          )}

          <div className="mt-6 relative">
            <div
              className={`absolute inset-y-0 left-0 w-10 h-full flex items-center justify-center bg-gray-200 rounded ${
                isFocused3 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="pl-12 pr-4 py-3 w-full border rounded focus:ring focus:ring-blue-500 focus:outline-none"
              onFocus={handleFocus3}
              onBlur={handleBlur3}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
          <div className="mt-6 relative">
            <div
              className={`absolute inset-y-0 left-0 w-10 h-full flex items-center justify-center bg-gray-200 rounded ${
                isFocused4 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-12 pr-4 py-3 w-full border rounded focus:ring focus:ring-blue-500 focus:outline-none"
              onFocus={handleFocus4}
              onBlur={handleBlur4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          <div className="mt-6 relative">
            <select
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)} // Update the state when an option is selected
              className="block w-full py-3 px-4 border border-gray-300 bg-white rounded focus:ring focus:ring-blue-500 focus:outline-none text-gray-700"
              required
            >
              <option value="" disabled hidden>
                Speciality
              </option>
              <option value="Math">Math</option>
              <option value="Physics">Physics</option>
              <option value="English">English</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>

          <div
            className="mb-4 mt-6"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              type="submit"
              className={`w-full py-3 bg-blue-500 text-white rounded ${
                isHovered ? "hover:bg-blue-600" : ""
              } flex justify-center items-center`}
            >
              Qeydiyyatdan keç
              {isHovered && <FaArrowRight className="ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
