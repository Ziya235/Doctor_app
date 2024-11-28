import React from "react";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { RiGraduationCapLine } from "react-icons/ri";
import { GoClock } from "react-icons/go";

const About = () => {
  // Sample data for 3 university experiences
  const experiences = [
    {
      id: 1,
      companyName: "Harvard University",
      title: "Bachelor of Science",
      startingDate: "09/01/2015",
      endDate: "06/01/2019",
      description: "Studied computer science with a focus on AI and machine learning.",
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

  return (
    <div className="mt-8 shadow-md rounded-lg border border-gray-200">
      {/* Card Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <MdOutlineLibraryBooks className="text-blue-600 text-lg" />
          <h2 className="ml-2 text-base font-bold">Experience</h2>
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
                    <div className="rounded-full p-4 bg-gray-500">
                      <RiGraduationCapLine className="text-white text-xl" />
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
          <button
            onClick={() => console.log("Add Experience Modal Open")}
            className="bg-blue-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all mt-6"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
