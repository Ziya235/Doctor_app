import React, { useRef, useEffect } from "react";

const GoogleMap = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initializeMap = () => {
            const google = window.google;
            const fixedLocation = { lat: 40.39522087832711, lng: 49.94292212951702 }; // Fixed Location

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

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
};

export default GoogleMap;
