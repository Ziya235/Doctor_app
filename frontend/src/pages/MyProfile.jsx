import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { FaGraduationCap } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import ProfileMap from "../components/Profile_map";

const MyProfile = () => {
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(doctors[3]);

  const [isPresent, setIsPresent] = useState(false);
  const [endDate, setEndDate] = useState("");

  const handlePresentCheckboxChange = (e) => {
    setIsPresent(e.target.checked);
    if (e.target.checked) {
      setEndDate(""); // Clear the end date when Present is checked
    }
  };

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
  const [openAddEditModal_edu, setOpenAddEditModal_edu] = useState(false);
  const [openAddEditModal_exp, setOpenAddEditModal_exp] = useState(false);

  useEffect(() => {
    // Check if any modal is open
    if (openAddEditModal || openAddEditModal_edu || openAddEditModal_exp) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on unmount
    };
  }, [openAddEditModal, openAddEditModal_edu, openAddEditModal_exp]);

  const experiences = [
    {
      id: 1,
      companyName: "Harvard University",
      title: "Bachelor of Science",
      startingDate: "09/01/2015",
      endDate: "06/01/2019",
      description:
        "Studied computer science with a focus on AI and machine learning. Studied computer science with a focus on AI and machine learning.Studied computer science with a focus on AI and machine learning.Studied computer science with a focus on AI and machine learning.Studied computer science with a focus on AI and machine learning.",
    },
    {
      id: 2,
      companyName: "Stanford University",
      title: "Master of Science",
      startingDate: "09/01/2020",
      endDate: "06/01/2022",
      description: "Specialized in software engineering and system design.",
    },
    {
      id: 3,
      companyName: "MIT",
      title: "PhD in Data Science",
      startingDate: "09/01/2022",
      endDate: "Present",
      description: "Researching advanced algorithms for big data processing.",
    },
  ];

  const workExperiences = [
    {
      id: 1,
      companyName: "Google",
      title: "Software Engineer",
      startingDate: "08/01/2019",
      endDate: "03/01/2022",
      description:
        "Developed scalable backend systems for Google Cloud. Led a team in creating an AI-powered search feature that improved search efficiency by 30%. Collaborated across teams to enhance performance of distributed systems.",
    },
    {
      id: 2,
      companyName: "Amazon",
      title: "Senior Software Developer",
      startingDate: "04/01/2022",
      endDate: "Present",
      description:
        "Architected and implemented microservices for Amazon Web Services (AWS). Designed and launched features for high-volume e-commerce platforms, improving user retention by 25%. Mentored junior developers on best practices and coding standards.",
    },
    {
      id: 3,
      companyName: "Facebook",
      title: "Software Engineer Intern",
      startingDate: "06/01/2018",
      endDate: "08/01/2018",
      description:
        "Built tools for automating data analysis for Facebook Ads. Optimized performance of existing algorithms, reducing processing time by 15%. Presented findings and improvements to senior management.",
    },
  ];

  return (
    <>
      {docInfo && (
        <div>
          {/* ------ Doctor Details-------- */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img
                className="bg-primary w-full sm:w-72 h-72 sm:h-80 rounded-lg  object-cover"
                src={docInfo.image}
                alt=""
              />
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg px-8 py-8 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 pb-[-4rem]  relative">
            {/* ---------Doc Info: name, degree, experience--------- */}
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name}
                <img src={assets.verified_icon} alt="" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>{docInfo.speciality} teacher</p>
                <button className="py-0.5 px-2 border text-xs rounded-full ">
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

              <div className="mb-12">
                <p className="text-gray-500 font-medium mt-4">
                  Phone :{" "}
                  <span className="text-gray-600">994-55-300-50-50</span>
                </p>

                <button
  onClick={() => setOpenAddEditModal(true)}
  className="mt-4 absolute   lg:right-10  px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
>
  UPDATE
</button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        className="add-notes-modal w-full max-w-4xl bg-white rounded-lg mx-auto mt-10 p-8 shadow-lg relative"
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
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Choose your experience
                </option>
                <option value="1years">1 Years</option>
                <option value="2years">2 Years</option>
                <option value="3years">3 Years</option>
                <option value="4years">4 Years</option>
                <option value="5years">5 Years</option>
                <option value="6years">6 Years</option>
                <option value="7years">7 Years</option>
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
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Choose your speciality
                </option>
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
        {/* Save button */}
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white font-semibold px-6 py-2 mt-3 rounded-md shadow-md hover:bg-blue-600 ">
            Save
          </button>
        </div>
      </Modal>

      {/* Education Part */}
      <div className="mt-8 shadow-md rounded-lg border border-gray-200">
        {/* Card Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            <AiOutlineFileText size={18} color="blue" />
            <h2 className="ml-2 text-base font-bold">Təhsil</h2>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            {experiences.map((item) => (
              <div key={item.id} className="w-full mb-6">
                <div className="flex justify-between">
                  <div className="pt-10">
                    <div className="flex gap-6 items-center ml-5">
                      {/* Icon Box */}
                      <div>
                        <FaGraduationCap className="text-blue-600 text-4xl" />
                      </div>

                      {/* Education Details */}
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-lg">
                          {item.companyName} ---- {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <GoClock />
                          <p className="text-sm text-gray-600">
                            {new Date(item.startingDate).toLocaleDateString()} -{" "}
                            {item.endDate === "Present"
                              ? "Present"
                              : new Date(item.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Education Button */}
            <div
              onClick={() => setOpenAddEditModal_edu(true)}
              className="flex items-center gap-1 bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all mt-6"
            >
              <MdAdd />
              <button>Əlavə et</button>
            </div>
          </div>
        </div>

        {/* Education Modal */}

        <Modal
          isOpen={openAddEditModal_edu}
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
              Təhsil
            </h1>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-full focus:outline-none"
              onClick={() => setOpenAddEditModal_edu(false)}
            >
              ✕
            </button>
          </div>

          <div className="">
            <div className="flex flex-col lg:gap-8 lg:flex-row">
              <div className="mb-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Universitet adı
                </label>
                <input
                  type="text"
                  placeholder="Universitet adı"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  İxtisas
                </label>
                <input
                  type="text"
                  placeholder="İxtisas"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col lg:gap-8 lg:flex-row">
              <div className="mb-4 flex-1 ">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End date
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    id="endDate"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    disabled={isPresent}
                    placeholder="mm/dd/yyyy"
                    value={isPresent ? "" : endDate} // Reset value when "Present" is checked
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPresent"
                      className="mr-2"
                      checked={isPresent}
                      onChange={handlePresentCheckboxChange}
                    />
                    <label
                      htmlFor="isPresent"
                      className="text-sm text-gray-700"
                    >
                      Present
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About you
              </label>
              <textarea
                placeholder="Write information about you"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none h-32"
              />
            </div>
            <div className="flex items-center justify-center lg:items-start lg:justify-end">
              <button className="w-full lg:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out">
                Save
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Experience Part */}
      <div className="mt-8 mb-14 shadow-md rounded-lg border border-gray-200">
        {/* Card Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            <MdOutlineLibraryBooks className="text-blue-600 text-lg" />
            <h2 className="ml-2 text-base font-bold">Təcrübə</h2>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            {workExperiences.map((item) => (
              <div key={item.id} className="w-full mb-6">
                <div className="flex justify-between">
                  <div className="pt-10">
                    <div className="flex gap-6 items-center ml-5">
                      {/* Icon Box */}
                      <div>
                        <MdWork className="text-blue-600 text-4xl" />
                      </div>

                      {/* Experience Details */}
                      <div className="flex flex-col gap-1">
                        <p className="font-bold text-lg">
                          {item.companyName} ---- {item.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <GoClock />
                          <p className="text-sm text-gray-600">
                            {new Date(item.startingDate).toLocaleDateString()} -{" "}
                            {item.endDate === "Present"
                              ? "Present"
                              : new Date(item.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Experience Button */}
            <div className="flex items-center gap-1 bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all mt-6">
              <MdAdd />
              <button
                onClick={() => setOpenAddEditModal_exp(true)}
               
              >
                Əlavə et
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={openAddEditModal_exp}
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
              Təcrübə
            </h1>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-full focus:outline-none"
              onClick={() => setOpenAddEditModal_exp(false)}
            >
              ✕
            </button>
          </div>

          <div className="">
            <div className="flex flex-col lg:gap-8 lg:flex-row">
              <div className="mb-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Şirkətin adı
                </label>
                <input
                  type="text"
                  placeholder="Şirkətin adı"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vəzifə
                </label>
                <input
                  type="text"
                  placeholder="Vəzifə"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col lg:gap-8 lg:flex-row">
              <div className="mb-4 flex-1 ">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="mb-4 flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End date
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    id="endDate"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                    disabled={isPresent}
                    placeholder="mm/dd/yyyy"
                    value={isPresent ? "" : endDate} // Reset value when "Present" is checked
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPresent"
                      className="mr-2"
                      checked={isPresent}
                      onChange={handlePresentCheckboxChange}
                    />
                    <label
                      htmlFor="isPresent"
                      className="text-sm text-gray-700"
                    >
                      Present
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About work
              </label>
              <textarea
                placeholder="Write information about work"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none h-32"
              />
            </div>
            <div className="flex items-center justify-center lg:items-start lg:justify-end">
              <button className="w-full lg:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out">
                Save
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Loaction Part */}
      <h1 className="text-center my-6 text-4xl font-bold text-gray-800 dark:text-gray-100  ">
        Location
      </h1>
      <ProfileMap />
    </>
  );
};

export default MyProfile;
