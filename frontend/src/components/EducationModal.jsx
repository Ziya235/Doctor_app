import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";

const EducationModal = ({ modalType, fetchData }) => {
  
  
  //Education States
  const [universityName, setUniversityName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [educationStartDate, setEducationStartDate] = useState("");
  const [educationEndDate, setEducationEndDate] = useState("");
  const [about_eduaction, setAbout_education] = useState("");

  const [isPresent, setIsPresent] = useState(false);

  const handlePresentCheckboxChange = (e) => {
    setIsPresent(e.target.checked);
    if (e.target.checked) {
      setEducationEndDate("");
    }
  };

  const token = Cookies.get("token");
  const teacherId = Cookies.get("teacherId");

  const [errors, setErrors] = useState({
    universityName: "",
    faculty: "",
    date: "",
  });

  const validateForm = () => {
    let formErrors = {};
    if (!universityName) {
      formErrors.universityName = "University Name is required";
    }
    if (!faculty) {
      formErrors.faculty = "University Name is required";
    }
    if (!educationStartDate) {
      formErrors.date = "Date is required";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const AddUniversity = async () => {

    if (!validateForm()) {
      return; // If there are errors, don't proceed with the save operation
    }

    try {
      const response = await fetch(`https://teacher-app-1-2wz3.onrender.com/create-university`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add this header
        },
        body: JSON.stringify({
          university: universityName,
          faculty,
          startDate: educationStartDate,
          endDate: educationEndDate,
          about_university: about_eduaction,
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
      setUniversityName("");
      setFaculty("");
      setEducationStartDate("");
      setEducationEndDate("");
      setAbout_education("");
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
      alert("Failed to update user details");
    }
  };

  

  return (
    <div>
      <div className="add-notes-modal w-full max-w-4xl bg-white rounded-lg mx-auto mt-14 p-8 shadow-lg relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 tracking-wide">
            Təhsil
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
                Universitet adı
              </label>
              <input
                value={universityName}
                onChange={(e) => {
                  setUniversityName(e.target.value);
                }}
                type="text"
                placeholder="Universitet adı"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
                  {errors.universityName && (
            <p className="text-red-500 text-sm mt-1">{errors.universityName}</p>
          )}
            </div>
            <div className="mb-4 flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                İxtisas
              </label>
              <input
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value);
                }}
                type="text"
                placeholder="İxtisas"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              />
                     {errors.faculty && (
            <p className="text-red-500 text-sm mt-1">{errors.faculty}</p>
          )}
            </div>
          </div>
          <div className="flex flex-col lg:gap-8 lg:flex-row">
            <div className="mb-4 flex-1 ">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start date
              </label>
              <input
                value={educationStartDate}
                onChange={(e) => {
                  setEducationStartDate(e.target.value);
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
                  value={isPresent ? "" : educationEndDate}
                  onChange={(e) => {
                    setEducationEndDate(e.target.value);
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
              About you
            </label>
            <textarea
              value={about_eduaction}
              onChange={(e) => {
                setAbout_education(e.target.value);
              }}
              placeholder="Write information about you"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none resize-none h-32"
            />
          </div>
          <div className="flex items-center justify-center lg:items-start lg:justify-end">
            <button
              onClick={() => {
                AddUniversity();
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

export default EducationModal;
