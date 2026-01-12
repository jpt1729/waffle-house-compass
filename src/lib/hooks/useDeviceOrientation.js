// hooks/useDeviceOrientation.js
import { useState, useEffect, useCallback } from 'react';

export const useDeviceOrientation = () => {
  const [heading, setHeading] = useState(0); 

  // FIX 1: Wrap in useCallback so the function reference never changes.
  // This ensures addEventListener and removeEventListener see the exact same function.
  const handleOrientation = useCallback((event) => {
    let newHeading = null;

    // 1. iOS Logic (WebKit)
    if (event.webkitCompassHeading) {
      newHeading = event.webkitCompassHeading;
    } 
    // 2. Android / Standard Logic
    // Note: On some Android devices, 'alpha' is relative to where you started, 
    // not True North. To get True North, you might need 'deviceorientationabsolute'
    // but that is a deeper rabbit hole. This works for most simple use cases.
    else if (event.alpha !== null) {
      newHeading = 360 - event.alpha;
    }

    if (newHeading !== null) {
      // Normalize
      newHeading = newHeading % 360; 
      if (newHeading < 0) newHeading += 360;
      
      setHeading(newHeading);
    }
  }, []);

  const requestAccessAsync = async () => {
    // SSR Check
    if (typeof window === 'undefined') return false;

    // iOS 13+ Logic
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation, true);
          return true;
        } else {
          throw new Error('Permission denied');
        }
      } catch (err) {
        throw new Error(err.message);
      }
    } else {
      // Non-iOS 13+ devices
      window.addEventListener('deviceorientation', handleOrientation, true);
      return true;
    }
  };

  // FIX 2: Add handleOrientation to the dependency array
  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation]);

  return { heading, requestAccess: requestAccessAsync };
};