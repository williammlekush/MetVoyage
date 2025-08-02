import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.jsx";
import { CssBaseline, CssVarsProvider, Sheet } from "@mui/joy";
import UserProvider from "./modules/Shared/components/UserProvider.jsx";
import { Feedback } from "@mui/icons-material";
import FeedbackProvider from "./modules/Shared/components/FeedbackProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          paddingTop: { xs: 2, md: 3 },
          paddingBottom: { xs: 2, sm: 2, md: 3 },
          paddingX: { xs: 1, md: "10%", lg: "20%" },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
        }}
      >
        <UserProvider>
          <FeedbackProvider>
            <Router />
          </FeedbackProvider>
        </UserProvider>
      </Sheet>
    </CssVarsProvider>
  </StrictMode>
);
