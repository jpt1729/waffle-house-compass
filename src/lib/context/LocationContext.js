/* eslint-disable react-hooks/set-state-in-effect */
// context/LocationContext.js
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if browser supports Geolocation
    if (!navigator.geolocation) {
      throw new Error('Geolocation not supported')
    }

    // 2. Start "Watching" the position
    // watchPosition fires every time the phone moves significantly
    const watcherId = navigator.geolocation.watchPosition(
      (position) => {
        // Success: Update state with new coords
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        console.log('got location')
        setLoading(false);
      },
      (err) => {
        // Error: Update error state
        setLoading(false);
        throw err
      },
      {
        enableHighAccuracy: true, // Uses GPS (more battery, better accuracy)
        timeout: 20000,           // Time to wait for a reading
        maximumAge: 1000,         // Accept cached positions up to 1s old
        distanceFilter: 5         // Minimum distance (in meters) to trigger an update
      }
    );

    // 3. Cleanup: Stop watching when the component unmounts
    // This prevents memory leaks and the "setState on unmounted component" error
    return () => {
      navigator.geolocation.clearWatch(watcherId);
    };
  }, []);

  return (
    <LocationContext.Provider value={{ location, loading }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};