import { useMemo, useState } from "react";
import { UserContext } from "../hooks/useUser";
import { FeedbackContext } from "../hooks/useFeedback";
import { Snackbar } from "@mui/joy";

export default function FeedbackProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();

  const sharedSnackbarProps = useMemo(
    () => ({
      anchorOrigin: { vertical: "bottom", horizontal: "center" },
      variant: "soft",
    }),
    []
  );

  return (
    <FeedbackContext.Provider value={{ setErrorMessage, setSuccessMessage }}>
      {children}
      <Snackbar
        open={!!errorMessage}
        onClose={() => setErrorMessage(null)}
        color="danger"
        {...sharedSnackbarProps}
      >
        {errorMessage}
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        onClose={() => setSuccessMessage(null)}
        color="success"
        {...sharedSnackbarProps}
      >
        {successMessage}
      </Snackbar>
    </FeedbackContext.Provider>
  );
}
