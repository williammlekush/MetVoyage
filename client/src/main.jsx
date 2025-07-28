import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.jsx";
import { Box, CssBaseline, CssVarsProvider, Sheet } from "@mui/joy";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          paddingTop: { xs: 2, md: 3 },
          paddingBottom: { xs: 2, sm: 2, md: 3 },
          paddingX: { xs: 1, md: "20%" },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
        }}
      >
        <Router />
      </Sheet>
    </CssVarsProvider>
  </StrictMode>
);
