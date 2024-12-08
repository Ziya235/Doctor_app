import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";

const ExperienceModal = ({ modalType, fetchData }) => {
  //Experience States
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [experienceStartDate, setExperienceStartDate] = useState("");
  const [experienceEndDate, setExperienceEndDate] = useState("");
  const [about_experience, setAbout_experience] = useState("");

  const [isPresent, setIsPresent] = useState(false);

  const handlePresentCheckboxChange = (e) => {
    setIsPresent(e.target.checked);
    if (e.target.checked) {
      setExperienceEndDate("");
    }
  };

  const token = Cookies.get("token");
  const teacherId = Cookies.get("teacherId");

  const [errors, setErrors] = useState({
    company: "",
    position: "",
    date: "",
  });

  const validateForm = () => {
    let formErrors = {};
    if (!companyName) {
      formErrors.company = "Company Name is required";
    }
    if (!position) {
      formErrors.position = "Position  is required";
    }
    if (!experienceStartDate) {
      formErrors.date = "Date is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const AddExperience = async () => {
    if (!validateForm()) {
      return; // If there are errors, don't proceed with the save operation
    }

    try {
      const response = await fetch(`https://teacher-app-1-2wz3.onrender.com/create-experience`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify({
          company_name: companyName,
          position,
          startDate: experienceStartDate,
          endDate: experienceEndDate,
          about_experience,
        }),
      });

      // Debug logging
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error("Failed to update user details");
      }

      const result = await response.json();
      fetchData(teacherId);
      modalType(false);
      setCompanyName("");
      setPosition("");
      setExperienceStartDate("");
      setExperienceEndDate("");
      setAbout_experience("");
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };

  return (
    <div>
      <div className="add-notes-modal w-full max-w-4xl bg-white rounded-lg mx-auto mt-14 p-8 shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Təcrübə
          </h1>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-full focus:outline-none"
            onClick={() => modalType(false)}
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
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                placeholder="Şirkətin adı"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vəzifə
              </label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                type="text"
                placeholder="Vəzifə"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">{errors.position}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:gap-8 lg:flex-row">
            <div className="mb-4 flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start date
              </label>
              <input
                value={experienceStartDate}
                onChange={(e) => {
                  setExperienceStartDate(e.target.value);
                }}
                type="date"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
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
                  value={isPresent ? "" : experienceEndDate}
                  onChange={(e) => {
                    setExperienceEndDate(e.target.value);
                  }}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPresent"
                    className="mr-2"
                    checked={isPresent}
                    onChange={handlePresentCheckboxChange}
                  />
                  <label htmlFor="isPresent" className="text-sm text-gray-700">
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
              value={about_experience}
              onChange={(e) => setAbout_experience(e.target.value)}
              placeholder="Write information about work"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none h-32"
            />
          </div>
          <div className="flex items-center justify-center lg:items-start lg:justify-end">
            <button
              onClick={() => {
                AddExperience();
              }}
              className="w-full lg:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceModal;
