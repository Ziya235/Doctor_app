import React, { useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import Modal from "react-modal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ProfileMap from "../components/Profile_map";
import Cookies from "js-cookie";
import EducationCard from "../components/EducationCard";
import ExperienceCard from "../components/ExperienceCard";
import EducationModal from "../components/EducationModal";
import ExperienceModal from "../components/ExperienceModal";

const MyProfile = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [openAddEditModal_edu, setOpenAddEditModal_edu] = useState(false);
  const [openAddEditModal_exp, setOpenAddEditModal_exp] = useState(false);

  useEffect(() => {
    // Check if any modal is open
    if (openAddEditModal || openAddEditModal_edu || openAddEditModal_exp) {
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Clean up on unmount
    };
  }, [openAddEditModal, openAddEditModal_edu, openAddEditModal_exp]);

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    fees: "",
    phone: "",
  });

  const validateForm = () => {
    let formErrors = {};
    if (!name) {
      formErrors.name = "Name is required";
    }
    if (!surname) {
      formErrors.surname = "Surname is required";
    }
    if(!phoneNumber) {
      formErrors.phone = "Phone number is required";
    }
    if (phoneNumber && phoneNumber.length < 10) {
      formErrors.phone = "Minimum length is 10";
    }
    if(!price) {
      formErrors.price = "Price is required";
    }
    if (price < 1) {
      formErrors.price = "Price must be bigger than 0";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


  const handleSaveProfilData = async () => {
    // Create FormData instead of using JSON
    const formData = new FormData();
    if (!validateForm()) {
      return; // If there are errors, don't proceed with the save operation
    }

    // Append all text fields
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("price", price);
    formData.append("about", about_you || "");
    formData.append("speciality", speciality);
    formData.append("experience", experience || "");
    formData.append("phone", phoneNumber || "");

    if (phoneNumber.length < 12) {
      return; // Exit the function early to prevent the request
    }

    if(price < 0) {
      return;
    }

    // Append date if exists
    if (birthOfDate) {
      const formattedDate = new Date(birthOfDate).toISOString();
      formData.append("dateOfBirth", formattedDate);
    }

    // Append profile image if exists
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }


    try {
      const response = await fetch(`http://localhost:5000/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type header when sending FormData
        },
        body: formData,
      });

      // Debug logging
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        throw new Error("Failed to update user details");
      }

      const result = await response.json();
      fetchUserData(userId);
      setOpenAddEditModal(false);
    } catch (error) {
      console.error("There was a problem with the update operation:", error);
    }
  };
  // Ref for file input

  const [profileData, setProfilData] = useState(null);

  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const teacherId = Cookies.get("teacherId");

  const [universityData, setUniversityData] = useState();

  const [experienceData, setExperienceData] = useState();

  // Define an async function to fetch the user data
  const fetchUserData = async (userId) => {
    const url = `http://localhost:5000/get-user/${userId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse JSON data
      setProfilData(data);

      // Set the individual fields
      setName(data.user.name);
      setSurname(data.user.surname);
      setPrice(data.user.price);
      setAbout_you(data.user.about);
      setSpeciality(data.user.speciality);
      setExperience(data.user.experience);
      setPhoneNumber(data.user.phone);

      // Format the birth date if it exists
      const formattedDate = data.user.dateOfBirth
        ? new Date(data.user.dateOfBirth).toISOString().split("T")[0]
        : "";

      const profileImageUrl = data.user.profileImage
        ? `http://localhost:5000/${data.user.profileImage.replace(/\\/g, "/")}`
        : null;
      setProfileImage1(profileImageUrl);

      // Log the dates for debugging

      setBirthOfDate(formattedDate);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const fetchUniversityData = async (teacherId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/get-teacher-universities/${teacherId}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse JSON data
      setUniversityData(data.universities); // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching university data:", error); // Handle errors
    }
  };

  const fetchExperienceData = async (teacherId) => {
    const url = `http://localhost:5000/get-teacher-experiences/${teacherId}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json(); // Parse the JSON data
      setExperienceData(data.experiences); // Set the experience data to the state
    } catch (error) {
      console.error("Error fetching data:", error); // Log any errors
    }
  };

  // Use useEffect to call the async function
  useEffect(() => {
    fetchUniversityData(teacherId);
    fetchExperienceData(teacherId);
    fetchUserData(userId);
  }, [userId]);

  // Profil Data States
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [price, setPrice] = useState();
  const [speciality, setSpeciality] = useState();
  const [experience, setExperience] = useState();
  const [about_you, setAbout_you] = useState();
  const [birthOfDate, setBirthOfDate] = useState();
  const [profileImage1, setProfileImage1] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for profile image
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 

  const formatPhoneNumber = (phone) => {
    if (!phone || typeof phone !== "string") return phone; // Handle invalid input

    // Use regex to split the number and format it
    const match = phone.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
    if (!match) return phone; // Return the original phone number if it doesn't match the expected format

    return `${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
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
  return (
    <>
      {profileData && (
        <div>
          {/* ------ Doctor Details-------- */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              {profileImage1 ? (
                <img
                  className="bg-primary w-full sm:w-72 h-72  rounded-lg  object-cover"
                  src={profileImage1}
                  alt=""
                />
              ) : (
                <img
                  src={assets.noAvatar}
                  alt="Placeholder"
                  className="bg-primary w-full sm:w-72 h-72  rounded-lg  object-cover"
                />
              )}
            </div>

            <div className="flex-1 border border-gray-400 rounded-lg px-8 py-4 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 pb-[-4rem]  relative">
              {/* ---------Doc Info: name, degree, experience--------- */}
              <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
                {profileData.user.name} {profileData.user.surname}
                <img src={assets.verified_icon} alt="" />
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
                <p>{profileData.user.speciality} teacher</p>
                {profileData.user.experience && (
                  <button className="py-0.5 px-2 border text-xs rounded-full ">
                    {profileData.user.experience}
                  </button>
                )}
              </div>

              {/* ----------Doctor about------------------- */}
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About
                  <img src={assets.info_icon} alt="" />
                </p>
                {profileData.user.about && profileData.user.about.trim() ? (
                  <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                    {profileData.user.about}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                    No additional information available.
                  </p>
                )}
              </div>

              <p className="text-gray-500 font-medium mt-4">
                Price :{" "}
                <span className="text-gray-600">
                  {profileData.user.price
                    ? `₼ ${profileData.user.price}`
                    : "Not specified"}
                </span>
              </p>

              <div>
                {profileData.user.phone ? (
                  <p className="text-gray-500 font-medium mt-4">
                    Phone :{" "}
                    <span className="text-gray-600">
                      + {formatPhoneNumber(profileData.user.phone)}
                    </span>
                  </p>
                ) : (
                  <p className="text-gray-500 font-medium mt-4">
                    Phone: <span className="text-gray-600">No phone.</span>
                  </p>
                )}
                <div className="flex flex-col lg:flex-row justify-between">
                  <p className="text-gray-500 font-medium mt-4 flex items-center space-x-2">
                    <span className="text-gray-700 font-bold">
                      Date of Birth:
                    </span>
                    <span className="text-gray-600">
                      {formatDateOfBirth(profileData.user.dateOfBirth)}
                    </span>
                    <span className="text-sm text-gray-500">
                      (Age:{" "}
                      <span className="text-blue-600 font-semibold">
                        {calculateAge(profileData.user.dateOfBirth)}
                      </span>
                      )
                    </span>
                  </p>

                  <button
                    onClick={() => setOpenAddEditModal(true)}
                    className="mt-4  px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        isOpen={openAddEditModal}
        size={"full"}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 60, // Higher z-index than the header
          },
        }}
        className="fixed inset-0 z-50 overflow-y-auto"
        contentLabel=""
      >
        <div className="add-notes-modal w-full max-w-4xl bg-white rounded-lg mx-auto mt-10 p-8 shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={() => setOpenAddEditModal(false)}
            className="absolute top-8 right-6 bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-full focus:outline-none"
          >
            ✕
          </button>

          {/* Image Upload Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="mb-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="cursor-pointer w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-gray-300"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={previewImage || profileImage1 || assets.noAvatar}
                    alt="Profile Image"
                    className="w-full h-full object-cover sm:w-72  rounded-lg bg-primary"
                    onError={(e) => {
                      // Handle error, e.g., display a default image or error message
                      e.target.src = assets.noAvatar; // Replace with your error handling logic
                    }}
                  />
                )}
              </div>
            </div>
            <div className="pb-4">
              <p className="text-lg font-semibold text-gray-800">Upload Your</p>
              <p className="text-lg font-semibold text-gray-800">Image</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type="text"
                  placeholder="Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
                 {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Surname
                </label>
                <input
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                  value={surname}
                  type="text"
                  placeholder="Surname"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
                 {errors.surname && (
            <p className="text-red-500 text-sm mt-1">{errors.surname}</p>
          )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fees
                </label>
                <input
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  defaultValue={0}
                  value={price}
                  type="number"
                  placeholder="Fees"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
                   {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  defaultValue={experience} // Use value instead of defaultValue
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Choose your experience
                  </option>
                  <option value="1years">1 Years</option>
                  <option value="2years">2 Years</option>
                  <option value="3years">3 Years</option>
                  <option value="4years">4 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="6years">6 Years</option>
                  <option value="7years">7 Years</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  value={birthOfDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setBirthOfDate(selectedDate);
                  }}
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="w-full mb-4">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <PhoneInput
                  id="phone-number"
                  country="az"
                  value={phoneNumber}
                  placeholder="+111 (11) 111-11-11"
                  onChange={(phone) => setPhoneNumber(phone)}
                  inputProps={{
                    required: true,
                  }}
                  inputStyle={{
                    height: "48px",
                    width: "100%",
                    borderRadius: "0.3rem",
                  }}
                  buttonStyle={{
                    background: "#fff",
                    borderRight: "none",
                  }}
                />
                {errors.phone && (
                  <div style={{ color: "red", marginTop: "10px" }}>
                    {errors.phone}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  defaultValue={speciality} // Use value instead of defaultValue
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Choose your speciality
                  </option>
                  <option value="Math">Math</option>
                  <option value="Physics">Physics</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About you
                </label>
                <textarea
                  onChange={(e) => {
                    setAbout_you(e.target.value);
                  }}
                  value={about_you}
                  placeholder="Write information about you"
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
          {/* Save button */}
          <div className="flex justify-center">
            <button
              onClick={() => handleSaveProfilData()}
              className="bg-blue-500 text-white font-semibold px-6 py-2 mt-3 rounded-md shadow-md hover:bg-blue-600 "
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Education Part */}
      <div className="mt-8 shadow-md rounded-lg border border-gray-200">
        {/* Card Header */}

        <EducationCard
          data={universityData}
          modalType={setOpenAddEditModal_edu}
        />

        {/* Education Modal */}

        <Modal
          isOpen={openAddEditModal_edu}
          size={"full"}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 60, // Higher z-index than the header
            },
          }}
          className="fixed inset-0 z-50 overflow-y-auto"
          contentLabel=""
        >
          <EducationModal
            modalType={setOpenAddEditModal_edu}
            fetchData={fetchUniversityData}
          />
        </Modal>
      </div>

      {/* Experience Part */}
      <div className="mt-8 mb-14 shadow-md rounded-lg border border-gray-200">
        {/* Card Header */}

        <ExperienceCard
          data={experienceData}
          modalType={setOpenAddEditModal_exp}
        />

        {/* Modal content */}
        <Modal
          isOpen={openAddEditModal_exp}
          size={"full"}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 60, // Higher z-index than the header
            },
          }}
          className="fixed inset-0 z-50 overflow-y-auto"
          contentLabel=""
        >
          <ExperienceModal
            modalType={setOpenAddEditModal_exp}
            fetchData={fetchExperienceData}
          />
        </Modal>
      </div>

    </>
  );
};

export default MyProfile;
