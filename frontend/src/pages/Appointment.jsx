import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";

import RelatedTeachers from "../components/RelatedTeachers";

import { MdOutlineLibraryBooks } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { FaGraduationCap } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";


const Appointment = () => {
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [universityData, setUniversityData] = useState();

  const [experienceData, setExperienceData] = useState();

  useEffect(() => {
    try {
      fetch(`
        https://teacher-app-1-2wz3.onrender.com/get-teacher-universities/${docId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON data
        })
        .then((data) => {
          setUniversityData(data);
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      fetch(`
        https://teacher-app-1-2wz3.onrender.com/get-teacher-experiences/${docId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON data
        })
        .then((data) => {
          setExperienceData(data);
        });
    } catch (error) {}
  }, []);

  const formatDateOfBirth = (dateString) => {
    if (!dateString) return "Not specified";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (dateString) => {
    if (!dateString) return "Age not specified";

    const birthDate = new Date(dateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const formatPhoneNumber = (phone) => {
    if (!phone || typeof phone !== "string") return phone; // Handle invalid input

    // Use regex to split the number and format it
    const match = phone.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phone; // Return the original phone number if it doesn't match the expected format

    return `${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
  };

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://teacher-app-1-2wz3.onrender.com/get-teacher/${docId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch teacher information");
        }

        const data = await response.json();

        // Process profile image URL
        const teacherWithImage = {
          ...data.user,
          profileImageUrl: data.user.profileImage
            ? `https://teacher-app-1-2wz3.onrender.com/${data.user.profileImage.replace(
                /\\/g,
                "/"
              )}`
            : null,
        };

        setDocInfo(teacherWithImage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teacher info:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (docId) {
      fetchTeacherInfo();
    }
  }, [docId]);

  if (loading) {
    return <div className="text-center mt-10">Loading teacher details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {docInfo && (
        <div>
          {/* Teacher Details */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <img
                className="bg-primary w-full sm:w-72 h-72  rounded-lg object-cover"
                src={docInfo.profileImageUrl || assets.noAvatar}
                alt={docInfo.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = assets.noAvatar;
                }}
              />
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg p-8 py-4 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
              {/* Doc Info: name, degree, experience */}
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {docInfo.name} {docInfo.surname}
                <img src={assets.verified_icon} alt="Verified" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>{docInfo.speciality} teacher</p>
                {docInfo.experience && (
                  <button className="py-0.5 px-2 border text-xs rounded-full ">
                    {docInfo.experience}
                  </button>
                )}
              </div>

              {/* Teacher about */}
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About
                  <img src={assets.info_icon} alt="Info" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {docInfo.about || "No additional information available."}
                </p>
              </div>

              <p className="text-gray-500 font-medium mt-4">
                Price :{" "}
                <span className="text-gray-600">
                  {docInfo.price ? `₼ ${docInfo.price}` : "Not specified"}
                </span>
              </p>
              <div>
                <p className="text-gray-500 font-medium mt-4">
                  Phone :{" "}
                  <span className="text-gray-600">
                    {docInfo.phone
                      ? `+ ${formatPhoneNumber(docInfo.phone)}`
                      : "Not specified"}
                  </span>
                </p>
                <div className="flex justify-between">
                  <p className="text-gray-500 font-medium mt-4 flex items-center space-x-2">
                    <span className="text-gray-700 font-bold">
                      Date of Birth:
                    </span>
                    <span className="text-gray-600">
                      {formatDateOfBirth(docInfo.dateOfBirth)}
                    </span>
                    <span className="text-sm text-gray-500">
                      (Age:{" "}
                      <span className="text-blue-600 font-semibold">
                        {calculateAge(docInfo.dateOfBirth)}
                      </span>
                      )
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            {universityData ? (
              universityData.universities.map((item,index) => (
                <div key={item.id || index}  className="w-full mb-6">
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
                            {item.university} ---- {item.faculty}
                          </p>
                          <div className="flex items-center gap-2">
                            <GoClock />
                            <p className="text-sm text-gray-600">
                              {new Date(item.startDate).toLocaleDateString()} -{" "}
                              {item.endDate
                                ? new Date(item.endDate).toLocaleDateString()
                                : "present"}
                            </p>
                          </div>
                          <p className="text-gray-600">
                            {item.about_university}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-2xl font-bold text-center text-gray-800 mt-10 mb-6 px-4 sm:px-8 lg:px-16">
                No Education
              </h1>
            )}
          </div>
        </div>
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
            {experienceData ? (
              experienceData.experiences.map((item,index) => (
                <div key={item.id || index} className="w-full mb-6">
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
                            {item.company_name} ---- {item.position}
                          </p>
                          <div className="flex items-center gap-2">
                            <GoClock />
                            <p className="text-sm text-gray-600">
                              {new Date(item.startDate).toLocaleDateString()} -{" "}
                              {item.endDate
                                ? new Date(item.endDate).toLocaleDateString()
                                : "present"}
                            </p>
                          </div>
                          <p className="text-gray-600">
                            {item.about_experience}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-2xl font-bold text-center text-gray-800 mt-10 mb-6 px-4 sm:px-8 lg:px-16">
                No Education
              </h1>
            )}
          </div>
        </div>
      </div>


      {/*Related Teacher */}

      {docInfo && (
        <RelatedTeachers docId={docId} speciality={docInfo.speciality} />
      )}
    </>
  );
};

export default Appointment;
