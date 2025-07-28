import { Typography } from "@mui/joy";
import { Close, Check } from "@mui/icons-material";

export default function InputValidMessage({ isValid, message }) {
  return (
    <Typography
      level="body-sm"
      color={isValid ? "success" : "danger"}
      sx={{ display: "flex", alignItems: "center" }}
    >
      {isValid ? (
        <Check sx={{ fontSize: "1rem" }} />
      ) : (
        <Close sx={{ fontSize: "1rem" }} />
      )}
      {message}
    </Typography>
  );
}
