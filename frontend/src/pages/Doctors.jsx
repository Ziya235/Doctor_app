import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showFilter_mobile, setShowFilter_mobile] = useState(true);

  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality === "all" || !speciality) {
      setFilterDoc(doctors); // Display all doctors when "all" is selected or no speciality
    } else {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality)); // Filter by speciality
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the teacher specialists</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Large screen: display <p> tags, hide <select> */}
        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Physics`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Physics" ? "bg-indigo-100 text-black" : ""}`}>Azərbaycan dili</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Math`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Math" ? "bg-indigo-100 text-black" : ""}`}>Riyaziyyat</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Chemistry`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Chemistry" ? "bg-indigo-100 text-black" : ""}`}>English</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/English`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "English" ? "bg-indigo-100 text-black" : ""}`}>Fizika</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Geography`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Geography" ? "bg-indigo-100 text-black" : ""}`}>Kimya</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Biology1`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Biology1" ? "bg-indigo-100 text-black" : ""}`}>Coğrafiya</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Biology2`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Biology2" ? "bg-indigo-100 text-black" : ""}`}>Tarix</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Biology3`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Biology3" ? "bg-indigo-100 text-black" : ""}`}>Biologiya</p>
          <p onClick={() => speciality === "all" ? navigate("/teachers") : navigate(`/teachers/Biology4`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Biology4" ? "bg-indigo-100 text-black" : ""}`}>İelts</p>
        </div>

        {/* Mobile screen: display <select>, hide <p> tags */}
        <div className="w-full block sm:hidden">
          <select 
            onChange={(e) => {
              const value = e.target.value;
              if (value === "all") {
                navigate("/teachers"); // Display all teachers
              } else {
                navigate(`/teachers/${value}`); // Navigate to specific speciality
              }
            }} 
            className="pl-3 py-2 pr-8 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all" className={`${speciality === "all" ? "bg-indigo-100 text-black" : ""}`}>All</option>
            <option value="Physics" className={`${speciality === "Physics" ? "bg-indigo-100 text-black" : ""}`}>Azərbaycan dili</option>
            <option value="Math" className={`${speciality === "Math" ? "bg-indigo-100 text-black" : ""}`}>Riyaziyyat</option>
            <option value="Chemistry" className={`${speciality === "Chemistry" ? "bg-indigo-100 text-black" : ""}`}>English</option>
            <option value="English" className={`${speciality === "English" ? "bg-indigo-100 text-black" : ""}`}>Fizika</option>
            <option value="Geography" className={`${speciality === "Geography" ? "bg-indigo-100 text-black" : ""}`}>Kimya</option>
            <option value="Biology" className={`${speciality === "Biology" ? "bg-indigo-100 text-black" : ""}`}>Coğrafiya</option>
            <option value="Biology" className={`${speciality === "Biology" ? "bg-indigo-100 text-black" : ""}`}>Tarix</option>
            <option value="Biology" className={`${speciality === "Biology" ? "bg-indigo-100 text-black" : ""}`}>Biologiya</option>
            <option value="Biology" className={`${speciality === "Biology" ? "bg-indigo-100 text-black" : ""}`}>İelts</option>
          </select>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            >
              <div className="relative w-full h-48 bg-blue-50">
                <img
                  className="teacher_image w-full h-full object-cover"
                  src={item.image}
                  alt={`${item.name}'s profile`}
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
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
