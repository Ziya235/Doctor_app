import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";
import GoogleMap from "./elaveler/post_map";
import Register from "./pages/Register";
import MyComponent from "./pages/Salam";
import Modal from 'react-modal';

// Set the app element (usually your root div)
Modal.setAppElement('#root'); 

const App = () => {
  return (
    <>
      <Navbar />
      <div className="mx-4 sm:mx-[10%]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Doctors />} />
          <Route path="/teachers/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/map" element={<GoogleMap />} />
          <Route path="/salam" element={<MyComponent />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;
