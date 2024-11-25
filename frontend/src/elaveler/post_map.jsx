import React, { useRef, useEffect, useState } from "react";

const GoogleMap = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const markerRef = useRef(null); // Use a ref to track the marker

    useEffect(() => {
        const initializeMap = () => {
            const google = window.google;
            const mapInstance = new google.maps.Map(mapRef.current, {
                center: { lat: 37.7749, lng: -122.4194 }, // Default to San Francisco
                zoom: 10,
            });

            // Add a click event listener to the map
            mapInstance.addListener("click", (e) => {
                const clickedLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                console.log("Clicked Location:", clickedLocation); // Log clicked location

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

    const handleSearch = () => {
        if (!map) return;

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: search }, (results, status) => {
            if (status === "OK") {
                map.setCenter(results[0].geometry.location);

                // Remove the existing marker if it exists
                if (markerRef.current) {
                    markerRef.current.setMap(null);
                }

                // Add a new marker at the searched location
                markerRef.current = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: map,
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    const [search, setSearch] = useState("");

    return (
        <div style={{ width: "100%", height: "100vh", position: "relative" }}>
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    zIndex: 1,
                    background: "white",
                    padding: "10px",
                    borderRadius: "4px",
                }}
            >
                <input
                    type="text"
                    placeholder="Search location..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "200px", marginRight: "10px" }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div
                ref={mapRef}
                style={{ width: "100%", height: "100%" }}
            ></div>
        </div>
    );
};

export default GoogleMap;
