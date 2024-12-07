import React from 'react'
import { GoClock } from "react-icons/go";
import { FaGraduationCap } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdWork } from "react-icons/md";



const ExperienceCard = ({data,modalType}) => {
  return (
    <div>
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            <MdOutlineLibraryBooks className="text-blue-600 text-lg" />
            <h2 className="ml-2 text-base font-bold">Təcrübə</h2>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <div className="flex flex-col items-center">
            {data &&
              data.map((item, index) => (
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
              ))}

            {/* Add Experience Button */}
            <div className="flex items-center gap-1 bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all mt-6">
              <MdAdd />
              <button onClick={() => modalType(true)}>
                Əlavə et
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ExperienceCard