"use client";
import { createContext, useContext, useState, useEffect } from "react";

import useSWR from "swr";

import { useLocation } from "../LocationContext";
import findNearestOpenWaffleHouse, {
  getBearing,
} from "./findNearestOpenWaffleHouse";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const WaffleHouseContext = createContext();

export function WaffleHouseProvider({ children }) {
  const { data, error, isLoading } = useSWR(
    "/data/waffle_house_data.json",
    fetcher
  );
  const waffleHouseLocations = data;

  const [waffleHouse, setWaffleHouse] = useState();
  const { location, loading } = useLocation();

  useEffect(() => {
    if (location && waffleHouseLocations && !isLoading) {
      console.log("Recalculating nearest Waffle House...");

      const { lat, long } = location;
      const closest = findNearestOpenWaffleHouse(
        lat,
        long,
        waffleHouseLocations
      );

      setWaffleHouse(closest);
    }
  }, [location, waffleHouseLocations, isLoading]);

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
