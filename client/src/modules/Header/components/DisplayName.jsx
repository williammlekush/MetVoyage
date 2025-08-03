import { Button, FormControl, FormLabel, Input } from "@mui/joy";
import { useUser } from "../../Shared/hooks/useUser";
import { Edit } from "@mui/icons-material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { usePending } from "../../Shared/hooks/usePending";
import { useFeedback } from "../../Shared/hooks/useFeedback";
import { updateDisplayName } from "../api";

export default function DisplayName() {
  const { user, setUser } = useUser();

  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    watch,
    register,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: { name: user?.name },
    mode: "all",
  });

  const name = watch("name");
  const { call, isPending } = usePending();
  const { setErrorMessage, setSuccessMessage } = useFeedback();

  const onSuccess = useCallback(() => {
    setIsEditing(false);
    setSuccessMessage("Display name updated successfully!");
    setUser({ ...user, name: name });
  }, [name, setSuccessMessage, setUser, user]);

  const updateName = useCallback(async () => {
    if (name === defaultValues.name) {
      setIsEditing(false);
      return;
    }

    await call(() => updateDisplayName(user.id, name))
      .then(onSuccess)
      .catch((error) =>
        setErrorMessage(error?.response?.data ?? error.message)
      );
  }, [name, defaultValues.name, call, onSuccess, user.id, setErrorMessage]);

  return isEditing ? (
    <FormControl disabled={isPending}>
      <FormLabel
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
      >
        Name
      </FormLabel>
      <Input
        autoFocus
        variant="plain"
        size="sm"
        slotProps={{ input: { maxLength: 30 } }}
        {...register("name", {
          required: true,
          max: 30,
        })}
        endDecorator={
          <Button
            variant="soft"
            size="sm"
            color="primary"
            disabled={errors.name}
            onClick={updateName}
            loading={isPending}
          >
            Save
          </Button>
        }
      />
    </FormControl>
  ) : (
    <Button
      variant="plain"
      color="neutral"
      startDecorator={hovered ? <Edit fontSize="md" /> : null}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setIsEditing(true)}
      size="sm"
      sx={{
        borderRadius: "xl",
      }}
      disabled={isPending}
    >
      {user?.name}
    </Button>
  );
}
