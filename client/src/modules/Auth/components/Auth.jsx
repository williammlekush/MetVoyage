import {
  Box,
  Button,
  Card,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Snackbar,
  Typography,
} from "@mui/joy";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  createUser,
  getUserExistsByUsername,
  getUserByUsernamePassword,
} from "./api";
import InputValidMessage from "./InputValidMessage";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usePending } from "../../Shared/hooks/usePending";
import { useNavigate } from "react-router-dom";
import { RELATIVE_URL } from "../../../Router";
import { useUser } from "../../Shared/hooks/useUser";
import Logo from "../../Shared/components/Logo";
import { useFeedback } from "../../Shared/hooks/useFeedback";

export default function Auth() {
  //#region common contexts
  const { setErrorMessage, setSuccessMessage } = useFeedback();
  const { call, isPending } = usePending();
  const { setUserFromDb } = useUser();
  //#endregion

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
    SIGN_IN_PASSWORD: 3,
  };

  const [authState, setAuthState] = useState(AuthState.SIGN_IN_NAME);
  //#endregion

  //#region navigate
  const navigate = useNavigate();

  const onSuccess = useCallback(
    (user, message) => {
      setSuccessMessage(message);
      setUserFromDb(user);
      navigate(RELATIVE_URL.OVERVIEW);
    },
    [navigate, setSuccessMessage, setUserFromDb]
  );
  //#endregion

  //#region validate input
  const [gotUsername, setGotUsername] = useState();
  const [userExists, setUserExists] = useState();

  const checkUserExists = useCallback(
    async (fromAuthState) =>
      await call(() => getUserExistsByUsername(username))
        .then((response) => {
          setUserExists(response.data);
          if (response.data) {
            setGotUsername(username);

            if (fromAuthState === AuthState.SIGN_IN_NAME)
              setAuthState(AuthState.SIGN_IN_PASSWORD);
          } else if (fromAuthState === AuthState.CREATE_NAME)
            setAuthState(AuthState.CREATE_PASSWORD);
          else if (fromAuthState === AuthState.SIGN_IN_NAME)
            setErrorMessage("User validation failed. Try again.");
        })
        .catch((error) => setErrorMessage(error)),

    [
      AuthState.CREATE_NAME,
      AuthState.CREATE_PASSWORD,
      AuthState.SIGN_IN_NAME,
      AuthState.SIGN_IN_PASSWORD,
      call,
      setErrorMessage,
      username,
    ]
  );

  const signIn = useCallback(
    async () =>
      await call(() => getUserByUsernamePassword(username, password))
        .then((response) => onSuccess(response.data, "Welcome back!"))
        .catch((error) =>
          setErrorMessage(error?.response?.data ?? error.message)
        ),
    [call, onSuccess, password, setErrorMessage, username]
  );
  //#endregion

  //#region create user
  const createAccount = useCallback(
    async () =>
      await call(() => createUser(username, password))
        .then((response) =>
          onSuccess(response.data, "Account created! Welcome!")
        )
        .catch((error) =>
          setErrorMessage(error?.response?.data ?? error.message)
        ),
    [call, onSuccess, password, setErrorMessage, username]
  );

  //#endregion

  //#region show/hide pass char
  const [showPassword, setShowPassword] = useState(false);
  //#endregion

  return (
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
      <Logo />
      <Typography level="h1">
        {[AuthState.CREATE_NAME, AuthState.CREATE_PASSWORD].includes(
          authState
        ) && "Create account"}
        {[AuthState.SIGN_IN_NAME, AuthState.SIGN_IN_PASSWORD].includes(
          authState
        ) && "Sign in"}
      </Typography>
      <FormControl
        disabled={
          isPending ||
          (userExists === false && authState === AuthState.CREATE_PASSWORD) ||
          (userExists && authState === AuthState.SIGN_IN_PASSWORD)
        }
        error={
          [AuthState.CREATE_NAME, AuthState.CREATE_PASSWORD].includes(
            authState
          ) &&
          userExists &&
          username === gotUsername
        }
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
        {[AuthState.CREATE_NAME, AuthState.CREATE_PASSWORD].includes(
          authState
        ) &&
          userExists &&
          username === gotUsername && (
            <FormHelperText>
              That username is taken.😢 Try again!
            </FormHelperText>
          )}
      </FormControl>

      {authState === AuthState.CREATE_PASSWORD && (
        <FormControl disabled={isPending}>
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
              isValid={password.length > 7}
              message="8 characters"
            />
          </Box>
        </FormControl>
      )}
      {authState === AuthState.SIGN_IN_PASSWORD && (
        <FormControl disabled={isPending}>
          <FormLabel>Password</FormLabel>
          <Input
            variant="outlined"
            placeholder="Enter a password..."
            slotProps={{ input: { maxLength: 70 } }}
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            endDecorator={
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                disabled={isPending}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            }
          />
        </FormControl>
      )}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        {authState === AuthState.CREATE_NAME && (
          <Button
            variant="plain"
            onClick={() => setAuthState(AuthState.SIGN_IN_NAME)}
            loading={isPending}
          >
            Sign in
          </Button>
        )}
        {authState === AuthState.SIGN_IN_NAME && (
          <Button
            variant="plain"
            onClick={() => setAuthState(AuthState.CREATE_NAME)}
            loading={isPending}
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
            onClick={() => checkUserExists(authState)}
            loading={isPending}
          >
            Next
          </Button>
        )}
        {[AuthState.CREATE_PASSWORD, AuthState.SIGN_IN_PASSWORD].includes(
          authState
        ) && (
          <Button
            variant="plain"
            onClick={() => {
              setUserExists(undefined);
              if (authState === AuthState.CREATE_PASSWORD)
                setAuthState(AuthState.CREATE_NAME);
              if (authState === AuthState.SIGN_IN_PASSWORD)
                setAuthState(AuthState.SIGN_IN_NAME);
            }}
            loading={isPending}
          >
            Change username
          </Button>
        )}
        {authState === AuthState.CREATE_PASSWORD && (
          <Button
            variant="solid"
            disabled={!password || !!errors.password}
            onClick={createAccount}
            loading={isPending}
          >
            Create
          </Button>
        )}
        {authState === AuthState.SIGN_IN_PASSWORD && (
          <Button
            variant="solid"
            disabled={!password || !!errors.password}
            onClick={signIn}
            loading={isPending}
          >
            Sign in
          </Button>
        )}
      </Box>
    </Card>
  );
}
