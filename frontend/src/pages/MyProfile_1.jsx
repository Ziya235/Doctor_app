import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MyProfile_1 = () => {
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(doctors[1]);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile)); // Create a preview URL
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(value.length >= 10); // Example validation (adjust as needed)
  };

  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  useEffect(() => {
    if (openAddEditModal) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Clean up
    };
  }, [openAddEditModal]);
  return (
    docInfo && (
      <div>
        {/* ------ Doctor Details-------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
            {/* ---------Doc Info: name,degree,experince--------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>{docInfo.speciality} teacher</p>
              <button className="py-0.5 px-2 border text-xs rounded-full ">
                {" "}
                {docInfo.experience}
              </button>
            </div>

            {/* ----------Doctor about------------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Price :{" "}
              <span className="text-gray-600">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
            <div className="flex justify-between">
              <p className="text-gray-500 font-medium mt-4">
                Phone : <span className="text-gray-600">994-55-300-50-50</span>
              </p>
              <button
                onClick={() => setOpenAddEditModal(true)}
                className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={openAddEditModal}
          // onRequestClose={() => setOpenAddEditModal(false)}
          size={"full"}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.5)", // Darker overlay for emphasis
            },
          }}
          contentLabel=""
          className="add-notes-modal w-full max-w-4xl bg-white rounded-lg mx-auto mt-14 p-8 shadow-lg relative"
        >
          {/* Close Button */}
          <button
            onClick={() => setOpenAddEditModal(false)}
            className="absolute top-8 right-6 bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-full focus:outline-none"
          >
            ✕
          </button>

          {/* Image Upload Section */}
          <div className="flex items-center gap-4 mb-8">
            <label
              htmlFor="file-upload"
              style={{
                display: "inline-block",
                cursor: "pointer",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: file
                  ? `url(${file}) center/cover no-repeat`
                  : "rgba(240, 240, 240, 1)",
              }}
              className="flex justify-center items-center"
            >
              {!file && (
                <img
                  src={assets.noAvatar}
                  alt="Placeholder"
                  className="rounded-full w-full h-full object-cover"
                />
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">Upload Your</p>
              <p className="text-lg font-semibold text-gray-800">Image</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Surname
                </label>
                <input
                  type="text"
                  placeholder="Surname"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fees
                </label>
                <input
                  type="number"
                  placeholder="Fees"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
                  <option value="2years">1 Years</option>
                  <option value="1years">2 Years</option>
                  <option value="1years">3 Years</option>
                  <option value="1years">4 Years</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="w-full mb-4">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <PhoneInput
                  id="phone-number"
                  country="az"
                  value={phoneNumber}
                  placeholder="+111 (11) 111-11-11"
                  onChange={handleChange}
                  inputProps={{
                    required: true,
                  }}
                  inputStyle={{
                    height: "48px",
                    width: "100%",
                    borderRadius: "0.3rem",
                  }}
                  buttonStyle={{
                    background: "#fff",
                    borderRight: "none",
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none">
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About you
                </label>
                <textarea
                  placeholder="Write information about you"
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  );
};

export default MyProfile_1;
