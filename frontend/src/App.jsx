import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Modal from 'react-modal';
import ProfileUpdateForm from "./pages/Salam";

// Set the app element (usually your root div)
Modal.setAppElement('#root'); 

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mx-4 sm:mx-[10%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/teachers/:speciality" element={<Teachers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/salam" element={<ProfileUpdateForm />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
