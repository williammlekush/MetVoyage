// App.jsx or Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Art from "./modules/Art/components/Art";
import Auth from "./modules/Auth/components/Auth";
import Overview from "./modules/Overview/components/Overview";

export const RELATIVE_URL = {
  AUTH: "/",
  ART: "/art",
  OVERVIEW: "/overview",
};

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RELATIVE_URL.AUTH} element={<Auth />} />
        <Route path={RELATIVE_URL.ART} element={<Art userId={1} />} />
        <Route path={RELATIVE_URL.OVERVIEW} element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
}
