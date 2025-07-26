// App.jsx or Router.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Art from "./components/Art/Art";
import App from "./App";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/art" element={<Art />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;