import React, { useRef, useEffect } from "react";

const InfoMap = () => {
  const mapRef = useRef(null);

  const fixedLocation = {
    lat: 40.39522087832711,
    lng: 49.94292212951702,
  }; // Fixed Location

  useEffect(() => {
    const initializeMap = () => {
      const google = window.google;

      // Initialize the map
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: fixedLocation,
        zoom: 15,
      });

      // Add a static marker at the fixed location
      new google.maps.Marker({
        position: fixedLocation,
        map: mapInstance,
      });
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

  const handleViewLargerMap = () => {
    const { lat, lng } = fixedLocation;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <>
      <div className="w-full h-[40vh] lg:h-[60vh] flex justify-center items-center">
        <div ref={mapRef} className="w-full lg:w-4/5 h-full"></div>
      </div>
      <button
        onClick={handleViewLargerMap}
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
        View Larger Map
      </button>
    </>
  );
};

export default InfoMap;
