import Link from "next/link";

import { useState, useEffect } from "react";
import { Geist_Mono } from "next/font/google";

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
  const [access, setAccess] = useState(false);

  let arrowRotation = 12;
  if (waffleHouse) {
    const waffleHouseLat = waffleHouse.latitude;
    const waffleHouseLong = waffleHouse.longitude;

    const bearing = getBearing(
      location.lat,
      location.long,
      waffleHouseLat,
      waffleHouseLong
    );

    arrowRotation = Math.abs((bearing - heading + 360) % 360);
  }
  useEffect(() => {
    console.log("rerender");
  });
  console.log(waffleHouse);
  return (
    <div className="min-h-dvh dark:bg-[#171717] bg-zinc-50">
      <div
        className={`${geistMono.className} flex flex-col items-center justify-center  font-sans  p-5 h-[calc(80vh)] m-auto`}
      >
        <div>
          <h1 className="font-bold text-xl">Waffle House Compass</h1>
        </div>
        <main className="flex justify-center items-center grow">
          <CompassArrow angle={arrowRotation} onClick = {() => {requestAccess()}}/>
        </main>
        <div>
          {waffleHouse ? (
            <p>
              Compass Connected to{" "}
              <Link href={waffleHouse.websiteURL} className="underline italic">
                {waffleHouse.businessName}
              </Link>
            </p>
          ) : (
            <p>Locating nearest Waffle House</p>
          )}
          <p>
            <Link
              href="https://github.com/jpt1729/waffle-house-compass"
              className="underline italic"
            >
              github
            </Link>
          </p>
          <p>Tip: Tap the arrow to activate compass</p>
        </div>
      </div>
    </div>
  );
}
