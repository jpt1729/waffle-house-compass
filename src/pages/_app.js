import "@/styles/globals.css";

import useSWR from "swr";

import { WaffleHouseProvider } from "@/lib/context/WaffleHouseContext";
import { LocationProvider } from "@/lib/context/LocationContext";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function App({ Component, pageProps }) {
  const { data, error, isLoading } = useSWR('/data/waffle_house_data.json', fetcher)
  return (
    <LocationProvider>
      {!isLoading &&
        <WaffleHouseProvider waffleHouseLocations={data}>
          <Component {...pageProps} />
        </WaffleHouseProvider>
      }
    </LocationProvider>
  );
}

