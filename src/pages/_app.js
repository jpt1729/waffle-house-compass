import "@/styles/globals.css";

import { WaffleHouseProvider } from "@/lib/context/WaffleHouseContext";
import { LocationProvider } from "@/lib/context/LocationContext";

export default function App({ Component, pageProps }) {
  return (
    <LocationProvider>
        <WaffleHouseProvider>
          <Component {...pageProps} />
        </WaffleHouseProvider>
    </LocationProvider>
  );
}

