import React, { useRef, useEffect, useState } from "react";

const ProfileMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markerRef = useRef(null); // Ref to track the marker

  const fixedLocation = {
    lat: 40.39522087832711,
    lng: 49.94292212951702,
  }; // Fixed Location

  useEffect(() => {
    const initializeMap = () => {
      const google = window.google;
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: fixedLocation, // Set the center to the fixed location
        zoom: 10,
      });

      // Add a marker for the fixed location
      markerRef.current = new google.maps.Marker({
        position: fixedLocation,
        map: mapInstance,
        title: "Fixed Location",
      });

      // Add a click event listener to the map
      mapInstance.addListener("click", (e) => {
        const clickedLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };

        // Remove the existing marker if it exists
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Create a new marker at the clicked location
        markerRef.current = new google.maps.Marker({
          position: clickedLocation,
          map: mapInstance,
        });
      });

      setMap(mapInstance);
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);


  return (
    <>
      <div className="w-full h-[50vh] lg:h-[70vh] flex justify-center items-center">
        <div ref={mapRef} className="w-full lg:w-4/5 h-full"></div>
      </div>

      <button
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Save Location
      </button>
    </>
  );
};

export default ProfileMap;
