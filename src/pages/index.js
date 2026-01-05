import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import CompassArrow from "@/components/compassArrow";

import { useWaffleHouse } from "@/lib/context/WaffleHouseContext";
import { useDeviceOrientation } from "@/lib/hooks/useDeviceOrientation";
import { getBearing } from "@/lib/getBearing";
import { useLocation } from "@/lib/context/LocationContext";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { heading, requestAccess } = useDeviceOrientation();
  const { location } = useLocation();
  const { waffleHouse } = useWaffleHouse();
  let arrowRotation = 12
  if (waffleHouse) {
    const waffleHouseLat = waffleHouse.latitude;
    const waffleHouseLong = waffleHouse.longitude;

    console.log(waffleHouse);

    const bearing = getBearing(
      location.lat,
      location.long,
      waffleHouseLat,
      waffleHouseLong
    );

    arrowRotation = Math.abs((bearing - heading + 360) % 360);
  }
  return (
    <div
      className={`${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <button onClick={requestAccess} style={{ marginBottom: 20 }}>
        Enable Compass
      </button>
      <CompassArrow angle={arrowRotation} />
    </div>
  );
}
