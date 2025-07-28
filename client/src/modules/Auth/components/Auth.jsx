import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Snackbar,
  Typography,
} from "@mui/joy";
import Collapse from "@mui/material/Collapse";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { getIsUsernameValid } from "./api";

export default function Auth() {
  const { watch, register, setValue } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "onBlur",
  });

  const username = watch("username");
  const [invalidUsername, setInvalidUsername] = useState();
  const [isUsernameValid, setIsUsernameValid] = useState();
  const [apiError, setApiError] = useState();

  const updateUsernameValidation = useCallback(
    (isValid) => {
      setIsUsernameValid(isValid);
      if (!isValid) setInvalidUsername(username);
    },
    [username]
  );

  const validateUsername = useCallback(
    async () =>
      await getIsUsernameValid(username)
        .then((response) =>
          response.status === 200
            ? updateUsernameValidation(response.data)
            : setApiError("Ope! Something went wrong! Tell a dev.")
        )
        .catch((error) => setApiError(error)),
    [updateUsernameValidation, username]
  );

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          borderRadius: "lg",
          paddingTop: 4,
          paddingX: 4,
          paddingBottom: 2,
          marginTop: "20%",
          marginBottom: "auto",
          marginX: { sm: "20%" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography level="title-lg" color="primary">
          MetVoyage
        </Typography>
        <Typography level="h1">Create account</Typography>
        <FormControl
          sx={{ marginBottom: 1 }}
          disabled={isUsernameValid}
          error={isUsernameValid === false || username === invalidUsername}
        >
          <FormLabel>Username</FormLabel>
          <Input
            variant="outlined"
            placeholder="Enter a username..."
            slotProps={{ input: { maxLength: 70 } }}
            {...register("username", {
              required: true,
              max: 70,
              onChange: ({ currentTarget: { value } }) =>
                setValue("username", value.trim()),
            })}
          />
          {isUsernameValid === false ||
            (username === invalidUsername && (
              <FormHelperText>
                That username is taken.😢 Try again!
              </FormHelperText>
            ))}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="plain">Sign in</Button>
          <Button
            variant="solid"
            disabled={username.trim().length === 0}
            onClick={validateUsername}
          >
            Next
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={!!apiError}
        onClose={() => setApiError(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color="danger"
        variant="soft"
      >
        {apiError}
      </Snackbar>
    </>
  );
}
