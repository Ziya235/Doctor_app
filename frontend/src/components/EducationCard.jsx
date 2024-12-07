import React from 'react'
import { GoClock } from "react-icons/go";
import { FaGraduationCap } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";


const EducationCard = ({data,modalType}) => {
  return (
    <div>
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            <AiOutlineFileText size={18} color="blue" />
            <h2 className="ml-2 text-base font-bold">Təhsil</h2>
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
              ))}

            {/* Add Education Button */}
            <div
              onClick={() => modalType(true)}
              className="flex items-center gap-1 bg-blue-600 cursor-pointer text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 transition-all mt-6"
            >
              <MdAdd />
              <button>Əlavə et</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EducationCard