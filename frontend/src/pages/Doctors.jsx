import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc,setFilterDoc] = useState([])
  const [showFilter,setShowFilter] = useState(false)
  
  const navigate = useNavigate("")

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if(speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else {
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div>
      <p className="text-gray-600 "> Browse throught the teacher speacialist</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <button className={`py-1 px-3 border rounded text-sm transtion-all sm:hidden ${showFilter ? "bg-primary text-white" :""}`} onClick={()=>setShowFilter(prev => !prev)}> Filters</button>
        <div className={` flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}>
          <p onClick={()=> speciality === "Physics" ? navigate('/doctors'):navigate("/doctors/Physics")} className= { `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Physics" ? "bg-indigo-100 text-black": ""}`}>Physics</p>
          <p onClick={()=> speciality === "Math" ? navigate('/doctors'):navigate("/doctors/Math")} className= { `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Math" ? "bg-indigo-100 text-black": ""}`} >Math</p>
          <p onClick={()=> speciality === "Chemistry" ? navigate('/doctors'):navigate("/doctors/Chemistry ")} className= { `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Chemistry" ? "bg-indigo-100 text-black": ""}`}>Chemistry</p>
          <p onClick={()=> speciality === "English" ? navigate('/doctors'):navigate("/doctors/English")} className= { `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "English" ? "bg-indigo-100 text-black": ""}`} >English</p>
          <p onClick={()=> speciality === "Geography" ? navigate('/doctors'):navigate("/doctors/Geography")} className= { `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Geography" ? "bg-indigo-100 text-black": ""}`} >Geography</p>
          <p onClick={()=> speciality === "Biology" ? navigate('/doctors'):navigate("/doctors/Biology")} className= { `w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Biology" ? "bg-indigo-100 text-black": ""}`} >Biology</p>
        </div> 
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {
    filterDoc.map((item, index) => (
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
    ))
  }
</div>

      </div>
    </div>
  )  
}

export default Doctors
