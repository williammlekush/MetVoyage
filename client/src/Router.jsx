// App.jsx or Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Art from "./modules/Art/components/Art";
import Auth from "./modules/Auth/components/Auth";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/art" element={<Art userId={1} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
