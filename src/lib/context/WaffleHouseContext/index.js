"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

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

  const lastCalculatedTime = useRef(0);

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastCalculatedTime.current;
    const ONE_MINUTE = 60000; // 60 seconds in milliseconds

    // 2. Add timeElapsed check to your condition
    if (
      location &&
      waffleHouseLocations &&
      !isLoading &&
      timeElapsed >= ONE_MINUTE
    ) {
      console.log("Recalculating nearest Waffle House...");

      const { lat, long } = location;
      const closest = findNearestOpenWaffleHouse(
        lat,
        long,
        waffleHouseLocations
      );

      setWaffleHouse(closest);

      // 3. Update the timestamp after a successful run
      lastCalculatedTime.current = now;
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
