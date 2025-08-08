// App.jsx or Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Art from "./modules/Art/components/Art";
import Auth from "./modules/Auth/components/Auth";
import Itinerary from "./modules/Itinerary/components/Itinerary";
import Overview from "./modules/Overview/components/Overview";

export const RELATIVE_URL = {
  AUTH: "/",
  ART: "/art",
  OVERVIEW: "/overview",
  ITINERARY: "/itinerary",
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RELATIVE_URL.AUTH} element={<Auth />} />
        <Route path={RELATIVE_URL.ART} element={<Art userId={1} />} />
        <Route path={RELATIVE_URL.OVERVIEW} element={<Overview />} />
        <Route path={RELATIVE_URL.ITINERARY} element={<Itinerary />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
