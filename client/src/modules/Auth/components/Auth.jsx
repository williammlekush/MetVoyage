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
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createUser, getIsUsernameValid } from "./api";
import InputValidMessage from "./InputValidMessage";

export default function Auth() {
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState();
  const [successSnackbarMessage, setSuccessSnackbarMessage] = useState();

  //#region form state
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "", password: "" },
    mode: "all",
  });

  const username = watch("username");
  const password = watch("password");

  const AuthState = {
    CREATE_NAME: 0,
    CREATE_PASSWORD: 1,
    SIGN_IN_NAME: 2,
  };

  const [authState, setAuthState] = useState(AuthState.SIGN_IN_NAME);
  //#endregion

  //#region validate username
  const [invalidUsername, setInvalidUsername] = useState();
  const [isUsernameValid, setIsUsernameValid] = useState();

  const validateUsername = useCallback(
    async () =>
      await getIsUsernameValid(username)
        .then((response) => {
          setIsUsernameValid(response.data);
          if (response.data) setAuthState(AuthState.CREATE_PASSWORD);
          else setInvalidUsername(username);
        })
        .catch((error) => setErrorSnackbarMessage(error)),
    [AuthState.CREATE_PASSWORD, username]
  );

  const createAccount = useCallback(
    async () =>
      await createUser(username, password)
        .then(() => {
          setSuccessSnackbarMessage("User created! Welcome!");
          // navigate to list page
        })
        .catch((error) =>
          setErrorSnackbarMessage(error.response.data ?? error.message)
        ),
    [password, username]
  );
  //#endregion

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
        <Typography level="h1">
          {[AuthState.CREATE_NAME, AuthState.CREATE_PASSWORD].includes(
            authState
          ) && "Create account"}
          {[AuthState.SIGN_IN_NAME].includes(authState) && "Sign in"}
        </Typography>
        <FormControl
          disabled={isUsernameValid && authState === AuthState.CREATE_PASSWORD}
          error={isUsernameValid === false && username === invalidUsername}
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
          {isUsernameValid === false && username === invalidUsername && (
            <FormHelperText>
              That username is taken.😢 Try again!
            </FormHelperText>
          )}
        </FormControl>
        {isUsernameValid && authState === AuthState.CREATE_PASSWORD && (
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              variant="outlined"
              placeholder="Enter a password..."
              slotProps={{ input: { maxLength: 70 } }}
              {...register("password", {
                required: true,
                min: 8,
                max: 70,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/~`+=;']).{8,}$/,
                onChange: ({ currentTarget: { value } }) =>
                  setValue("password", value.trim()),
              })}
            />
            <Box
              sx={{
                paddingTop: 0.25,
                paddingLeft: 1,
                display: "flex",
                flexWrap: "wrap",
                columnGap: 1.25,
              }}
            >
              <InputValidMessage
                isValid={/[a-z]/.test(password)}
                message="1 lowercase"
              />
              <InputValidMessage
                isValid={/[A-Z]/.test(password)}
                message="1 uppercase"
              />
              <InputValidMessage
                isValid={/\d/.test(password)}
                message="1 number"
              />
              <InputValidMessage
                isValid={/[!@#$%^&*(),.?":{}|<>_\-\\[\]/~`+=;']/.test(password)}
                message="1 special"
              />
              <InputValidMessage
                isValid={password.length > 8}
                message="8 characters"
              />
            </Box>
          </FormControl>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          {authState === AuthState.CREATE_NAME && (
            <Button
              variant="plain"
              onClick={() => setAuthState(AuthState.SIGN_IN_NAME)}
            >
              Sign in
            </Button>
          )}
          {authState === AuthState.SIGN_IN_NAME && (
            <Button
              variant="plain"
              onClick={() => setAuthState(AuthState.CREATE_NAME)}
            >
              Create account
            </Button>
          )}
          {[AuthState.CREATE_NAME, AuthState.SIGN_IN_NAME].includes(
            authState
          ) && (
            <Button
              variant="solid"
              disabled={username.trim().length === 0}
              onClick={validateUsername}
            >
              Next
            </Button>
          )}
          {authState === AuthState.CREATE_PASSWORD && (
            <>
              <Button
                variant="plain"
                onClick={() => {
                  setIsUsernameValid(undefined);
                  setAuthState(AuthState.CREATE_NAME);
                }}
              >
                Change username
              </Button>
              <Button
                variant="solid"
                disabled={!password || !!errors.password}
                onClick={createAccount}
              >
                Create
              </Button>
            </>
          )}
        </Box>
      </Card>
      <Snackbar
        open={!!errorSnackbarMessage}
        onClose={() => setErrorSnackbarMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color="danger"
        variant="soft"
      >
        {errorSnackbarMessage}
      </Snackbar>
      <Snackbar
        open={!!successSnackbarMessage}
        onClose={() => setSuccessSnackbarMessage(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        color="success"
        variant="soft"
      >
        {successSnackbarMessage}
      </Snackbar>
    </>
  );
}
