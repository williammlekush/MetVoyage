// App.jsx or Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Art from "./modules/Art/components/Art";
import App from "./App";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/art" element={<Art userId={1} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
