import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

import { MdOutlineLibraryBooks } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { FaGraduationCap } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import ProfileMap from "../components/Profile_map";
import InfoMap from "../components/InfoMap";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  // const [slotIndex, setSlotIndex] = useState(0);
  // const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    console.log(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

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
              <p className="text-gray-500 font-medium mt-4">
                Phone : <span className="text-gray-600">994-55-300-50-50</span>
              </p>
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
          </div>
        </div>
      </div>

      {/* Map Part */}

      <h1 className="text-center my-6 text-4xl font-bold text-gray-800 dark:text-gray-100  ">
        Location
      </h1>
      <InfoMap />

      {/*Related Doctors */}

      {docInfo && (
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      )}
    </>
  );
};

export default Appointment;
