"use client";
import { createContext, useContext, useState, useEffect } from "react";

import { useLocation } from "../LocationContext";
import findNearestOpenWaffleHouse, {
  getBearing,
} from "./findNearestOpenWaffleHouse";

const WaffleHouseContext = createContext();

export function WaffleHouseProvider({ children, waffleHouseLocations }) {
  const [waffleHouse, setWaffleHouse] = useState();
  const { location, loading } = useLocation();

  useEffect(() => {
    setInterval(() => {
      if (!loading) {
        const { lat, long } = location;
        let closestWaffleHouse = findNearestOpenWaffleHouse(
          lat,
          long,
          waffleHouseLocations
        );
        
        if (waffleHouse != closestWaffleHouse) {
          setWaffleHouse(closestWaffleHouse);
        }
      }
    }, 2500);
  }, []);

  return (
    <WaffleHouseContext.Provider value={{ waffleHouse }}>
      {children}
    </WaffleHouseContext.Provider>
  );
}

export const useWaffleHouse = () => {
  const context = useContext(WaffleHouseContext);

  if (!context) {
    throw new Error("useWaffleHouse must be used within a WaffleHouseProvider");
  }

  return context;
};
