import React, { useState } from "react";
import { FaArrowRight, FaEnvelope, FaLock } from "react-icons/fa";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocus2 = () => setIsFocused2(true);
  const handleBlur2 = () => setIsFocused2(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
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

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email or password is wrong");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Display success toast
        toast.success("Login successful!", {
          autoClose: 5000,
        });

        const token = data.accessToken;
        const userId = data.user.id;
        const teacherId = data.user.teacher_id;

        // Store the token in cookies
        Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
        Cookies.set("userId", userId, { expires: 7 });
        Cookies.set("teacherId", teacherId, { expires: 7 });


        // Navigate to the home page
        navigate("/");
      })
      .catch((error) => {
        // Display error toast
        toast.error("Email or password is incorrect!", {
          autoClose: 3000,
        });
        console.log("Error:", error);
      });
  };

  return (
    <div className="bg-white shadow-md w-4/5 lg:w-1/2 mx-auto pb-8">
      <div className="flex justify-start  border-blue-500">
        <p className="py-4 px-16 text-blue-500 text-base border-b-2 border-blue-500 cursor-pointer hover:text-black">
          Login
        </p>
        <p className="py-4 px-16 text-gray-500 cursor-pointer">
          <Link to="/register" className="hover:text-black">
            Register
          </Link>
        </p>
      </div>

      <div className="flex flex-col items-center mt-8 space-y-2">
        <h1 className="font-bold text-lg lg:text-2xl">
        We are glad to see you again!
        </h1>
        <p className="text-sm lg:text-base text-gray-600">
        Don't have an account? {" "}
          <Link to="/register" className="text-blue-500 hover:underline">
          Sign up!
          </Link>
        </p>
      </div>

      <div className="w-4/5 lg:w-3/5 mx-auto mt-6">
        <form onSubmit={handleSubmit}>
          <div className=" relative">
            <div
              className={`absolute inset-y-0 left-0 w-10 h-full flex items-center justify-center bg-gray-200 rounded ${
                isFocused ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="pl-12 pr-4 py-3 w-full border rounded focus:ring focus:ring-blue-500 focus:outline-none"
              onFocus={handleFocus}
              onBlur={handleBlur}
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
                isFocused2 ? "text-blue-500" : "text-gray-500"
              }`}
            >
              <FaLock />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-12 pr-4 py-3 w-full border rounded focus:ring focus:ring-blue-500 focus:outline-none"
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

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
              Login
              {isHovered && <FaArrowRight className="ml-2" />}
            </button>
          </div>
        </form>
      </div>

      {/* ToastContainer should be rendered here */}
      <ToastContainer />
    </div>
  );
};

export default Login;
