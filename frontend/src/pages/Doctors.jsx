import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

import {assets} from "../assets/assets"

const Doctors = () => {
  const { speciality } = useParams();
  const [allTeacher, setAllTeacher] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch("http://localhost:5000/get-all-teacher")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch teachers");
          }
          return response.json();
        })
        .then((data) => {
          // Map teachers to include full profile image URL
          const teachersWithImages = data.users.map(teacher => ({
            ...teacher,
            profileImageUrl: teacher.profileImage
              ? `http://localhost:5000/${teacher.profileImage.replace(/\\/g, "/")}`
              : null
          }));

          setAllTeacher(teachersWithImages);
        })
        .catch(error => {
          console.error("Error fetching teachers:", error);
        });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  // Filter teachers based on speciality
  useEffect(() => {
    if (speciality && speciality !== "all") {
      const filtered = allTeacher.filter(teacher => 
        teacher.speciality.toLowerCase() === speciality.toLowerCase()
      );
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers(allTeacher);
    }
  }, [speciality, allTeacher]);

  // Mapping of display names to actual speciality values
  const specialityMapping = {
    "Azərbaycan dili": "Azerbaijan Language",
    "Riyaziyyat": "Math",
    "English": "English",
    "Fizika": "Physics",
    "Kimya": "Chemistry",
    "Coğrafiya": "Geography",
    "Tarix": "History",
    "Biologiya": "Biology",
    "İelts": "IELTS"
  };

  return (
    <div>
      <p className="text-gray-600">Browse through the teacher specialists</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Large screen: display <p> tags, hide <select> */}
        <div className={`flex-col gap-4 text-sm text-gray-600 sm:flex sm:block hidden`}>
          <p onClick={() => navigate("/teachers")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${!speciality || speciality === "all" ? "bg-indigo-100 text-black" : ""}`}>All</p>
          {Object.entries(specialityMapping).map(([displayName, value]) => (
            <p 
              key={value}
              onClick={() => navigate(`/teachers/${value}`)} 
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === value ? "bg-indigo-100 text-black" : ""}`}
            >
              {displayName}
            </p>
          ))}
        </div>

        {/* Mobile screen: display <select> */}
        <div className="w-full block sm:hidden">
          <select 
            value={speciality || "all"}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "all") {
                navigate("/teachers");
              } else {
                navigate(`/teachers/${value}`);
              }
            }} 
            className="pl-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            {Object.entries(specialityMapping).map(([displayName, value]) => (
              <option key={value} value={value}>{displayName}</option>
            ))}
          </select>
        </div>

        {/* Teachers Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTeachers.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
             <div className="relative w-full h-64 bg-blue-50">
                {item.profileImageUrl ? (
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    src={item.profileImageUrl}
                    alt={`${item.name}'s profile`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = assets.noAvatar;
                    }}
                  />
                ) : (
                  <img
                    src={assets.noAvatar}
                    alt="Placeholder"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name} {item.surname}</p>
                <p className="text-gray-600 text-sm">{item.speciality} teacher</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;