import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {assets} from "../assets/assets"

const RelatedTeachers = ({ docId, speciality }) => {

  const [relDoc, setRelDoc] = useState([]);

  const navigate = useNavigate()

  const [allTeacher, setAllTeacher] = useState([]);


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

  useEffect(() => {
    if (allTeacher.length > 0 && speciality) {
      const teachersDate = allTeacher.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(teachersDate);
    }
  }, [speciality, docId, allTeacher]);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Teachers</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of teachers.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() =>{ navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
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
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>{" "}
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality} teacher</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/teachers");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default RelatedTeachers;
