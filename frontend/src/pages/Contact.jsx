import React, { useState } from "react";
import { FaCheck, FaRegEnvelope, FaRegUserCircle, FaBook } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleFocus_2 = () => setIsFocused2(true);
  const handleBlur_2 = () => setIsFocused2(false);
  const handleFocus_3 = () => setIsFocused3(true);
  const handleBlur_3 = () => setIsFocused3(false);

  const backgroundColor = isFocused ? "blue" : "gray";
  const backgroundColor2 = isFocused2 ? "blue" : "gray";
  const backgroundColor3 = isFocused3 ? "blue" : "gray";

  const { handleSubmit, register, formState: { errors }, reset } = useForm();
  const token = Cookies.get("token");

  const onSubmit = async (values) => {
    const url = "https://neo-814m.onrender.com/v1/contact/";
    const method = "POST";

    const payload = {
      fullname: values.name,
      email: values.email,
      subject: values.topic,
      message: values.textarea,
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-type": "application/json",
          Token: `${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      toast.success("Form submitted successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        icon: (
          <FaCheck
            style={{
              backgroundColor: "#fff",
              color: "#5BB318",
              borderRadius: "100px",
              padding: "2px",
            }}
          />
        ),
        style: {
          backgroundColor: "#5BB318",
          color: "#fff",
        },
      });

      reset();
    } catch (error) {
      console.error("Data is not Posted", error.message);
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="container max-w-7xl bg-white shadow-2xl rounded-md p-8">
      <h2 className="font-bold text-2xl mb-5">Do you have any questions? Don't hesitate to contact us!</h2>
      <hr className="mb-5" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row lg:gap-8 ">
          {/* Name Field */}
          <div className="flex-1">
            <div className="relative mb-6">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <FaRegUserCircle color={backgroundColor} />
              </div>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                id="name"
                type="text"
                className="w-full p-4 pl-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Full Name"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div className="flex-1">
            <div className="relative mb-6">
              <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
                <FaRegEnvelope color={backgroundColor2} />
              </div>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                id="email"
                type="email"
                className="w-full p-4 pl-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Email"
                onFocus={handleFocus_2}
                onBlur={handleBlur_2}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>
        </div>

        {/* Topic Field */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4">
              <FaBook color={backgroundColor3} />
            </div>
            <input
              {...register("topic", {
                required: "Subject is required",
              })}
              id="topic"
              type="text"
              className="w-full p-4 pl-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Subject"
              onFocus={handleFocus_3}
              onBlur={handleBlur_3}
            />
            {errors.topic && <p className="text-red-500 text-sm">{errors.topic.message}</p>}
          </div>
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <textarea
            {...register("textarea", {
              required: "Message is required",
            })}
            id="textarea"
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
            placeholder="Your Message"
            rows="6"
          />
          {errors.textarea && <p className="text-red-500 text-sm">{errors.textarea.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full lg:w-auto bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Send Message
        </button>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Contact;
