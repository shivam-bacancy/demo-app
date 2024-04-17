import { FieldError, FieldPath, UseFormRegister } from "react-hook-form";
import { UserDetails } from "../../types/UserFormTypes";
import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
// import { DateField } from "@mui/x-date-pickers";

function TextInput({
  label,
  error,
  register,
  name,
  fullWidth,
  type,
}: {
  type?: HTMLInputTypeAttribute;
  fullWidth?: boolean;
  label: string;
  register: UseFormRegister<UserDetails>;
  error?: FieldError;
  name: FieldPath<UserDetails>;
}) {
  return (
    <TextField
      fullWidth={fullWidth}
      {...register(name)}
      variant="outlined"
      label={type === "date" ? "" : label}
      type={type}
      error={Boolean(error?.message)}
      helperText={error?.message}
    />
  );
}

export default TextInput;
