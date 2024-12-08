import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from "js-cookie"

const ProfileUpdateForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    speciality: '',
    experience: '',
    about: '',
    price: '',
    phone: '',
    dateOfBirth: '',
  });

  // State for profile image
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // State for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Ref for file input
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError('');
    setSuccess('');

    // Create form data for multipart/form-data
    const formDataToSend = new FormData();
    
    // Append all text fields
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    // Append profile image if exists
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    try {
      // Get authentication token (adjust based on your auth method)
      const token = Cookies.get('token');

      // Make API call
      const response = await axios.put(
        'https://teacher-app-1-2wz3.onrender.com/update-profile', 
        formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Handle successful response
      setSuccess(response.data.message);
      
      // Optional: Update user info in local storage or context
      localStorage.setItem('userProfile', JSON.stringify(response.data.user));
    } catch (err) {
      // Handle errors
      const errorMsg = err.response?.data?.message || 'Failed to update profile';
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="mb-4">
          <label className="block mb-2 font-bold">Profile Image</label>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div 
            onClick={() => fileInputRef.current.click()}
            className="cursor-pointer w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-2 border-gray-300"
          >
            {previewImage ? (
              <img 
                src={previewImage} 
                alt="Profile Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Upload Image
              </div>
            )}
          </div>
        </div>

        {/* Basic Info Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded w-full"
          />
          <input 
            type="text" 
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Speciality and Experience */}
        <div className="mb-4">
          <input 
            type="text" 
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            placeholder="Speciality"
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <input 
            type="text" 
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of Experience"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* About Section */}
        <div className="mb-4">
          <textarea 
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="About You"
            className="border p-2 rounded w-full h-24"
          />
        </div>

        {/* Price and Contact */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Hourly Rate"
            className="border p-2 rounded w-full"
          />
          <input 
            type="text" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block mb-2">Date of Birth</label>
          <input 
            type="date" 
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;